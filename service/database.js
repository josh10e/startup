const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const db = client.db('diveplanner');
const userCollection = db.collection('user');
const diveCollection = db.collection('dives');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connected to MongoDB at ${config.hostname}`);
  } catch (ex) {
    console.log(`Unable to connect to database because ${ex.message}`);
    process.exit(1);
  }
})();

async function getUser(email) {
  return userCollection.findOne({ email: email });
}

async function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  return userCollection.insertOne(user);
}

async function updateUser(user) {
  return userCollection.updateOne(
    { email: user.email },
    { $set: user }
  );
}

async function addDive(dive) {
  return diveCollection.insertOne(dive);
}

async function getUserDives(email) {
  return diveCollection.find({ email: email }).toArray();
}

async function deleteDive(id) {
  return diveCollection.deleteOne({ id: id });
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addDive,
  getUserDives,
  deleteDive
};