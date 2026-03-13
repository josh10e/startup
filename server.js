const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const authCookieName = 'token';
const port = 4000;

let users = [];
let dives = [];

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
  if (users.find(u => u.email === email)) return res.status(409).send({ msg: 'Existing user' });

  const hashed = await bcrypt.hash(password, 10);
  const token = uuidv4();
  users.push({ email, password: hashed, token });
  res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'strict' });
  res.send({ email });
});

apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).send({ msg: 'Unauthorized' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send({ msg: 'Unauthorized' });

  user.token = uuidv4();
  res.cookie(authCookieName, user.token, { httpOnly: true, sameSite: 'strict' });
  res.send({ email });
});

apiRouter.delete('/auth/logout', (req, res) => {
  const token = req.cookies[authCookieName];
  const user = users.find(u => u.token === token);
  if (user) delete user.token;

  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.get("/auth/me", (req, res) => {
  const token = req.cookies[authCookieName];
  const user = users.find((u) => u.token === token);
  if (!user) return res.status(401).send({ msg: "Unauthorized" });
  res.send({ email: user.email });
});

// Dive routes
const verifyAuth = (req, res, next) => {
  const token = req.cookies[authCookieName];
  const user = users.find(u => u.token === token);
  if (!user) return res.status(401).send({ msg: 'Unauthorized' });
  req.user = user;
  next();
};

apiRouter.get('/dives', verifyAuth, (req, res) => {
  const userDives = dives.filter(d => d.email === req.user.email);
  res.send(userDives);
});

apiRouter.post('/dives', verifyAuth, (req, res) => {
  const newDive = { id: uuidv4(), email: req.user.email, ...req.body };
  dives.push(newDive);
  res.send(newDive);
});

apiRouter.delete('/dives/:id', verifyAuth, (req, res) => {
  dives = dives.filter(d => d.id !== req.params.id);
  res.send(dives);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err.message });
});

app.listen(port, () => console.log(`Listening on port ${port}`));