const DB = require('./database.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
require("dotenv").config();
console.log("Weather key:", process.env.OPENWEATHER_KEY);
const app = express();
const authCookieName = 'token';
const port = 4000;

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cookieParser());

app.get('/api', (_req, res) => {
  res.send({ msg: 'API is running' });
});

const apiRouter = express.Router();
app.use('/api', apiRouter);

// Auth routes
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await DB.getUser(email);
  if (existingUser) {
    return res.status(409).send({ msg: 'Existing user' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const token = uuidv4();

  const user = {
    email: email,
    password: hashedPassword,
    token: token
  };

  await DB.addUser(user);

  res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'strict' });
  res.send({ email: email });
});

apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await DB.getUser(email);
  if (!user) return res.status(401).send({ msg: 'Unauthorized' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send({ msg: 'Unauthorized' });

  user.token = uuidv4();
  await DB.updateUser(user);
  res.cookie(authCookieName, user.token, { httpOnly: true, sameSite: 'strict' });
  res.send({ email });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const token = req.cookies[authCookieName];
  const user = await DB.getUserByToken(token);
  if (user) delete user.token;

  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.get("/auth/me", async (req, res) => {
  const token = req.cookies[authCookieName];
  const user = await DB.getUserByToken(token);
  if (!user) return res.status(401).send({ msg: "Unauthorized" });
  res.send({ email: user.email });
});

// Dive routes
const verifyAuth = async (req, res, next) => {
  const token = req.cookies[authCookieName];
  const user = await DB.getUserByToken(token);
  if (!user) return res.status(401).send({ msg: 'Unauthorized' });
  req.user = user;
  next();
};

apiRouter.get('/dives', verifyAuth, async (req, res) => {
  const dives = await DB.getUserDives(req.user.email);
  res.send(dives);
});

apiRouter.post('/dives', verifyAuth, async (req, res) => {
  const newDive = {
    id: uuidv4(),
    email: req.user.email,
    ...req.body
  };
  await DB.addDive(newDive);
  res.send(newDive);
});

apiRouter.delete('/dives/:id', verifyAuth, async (req, res) => {
  await DB.deleteDive(req.params.id);
  res.send({ msg: "Dive deleted" });
});

apiRouter.get("/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.OPENWEATHER_KEY;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    );

    res.send({
      city: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send({ msg: "Weather lookup failed" });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));