const MongoClient = require('mongodb').MongoClient;

const user = process.env.DB_USER;
const password = process.env.DB_PWORD;
const dbName = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

const url = `mongodb://${user}:${password}@${host}:${port}`;
let db;

MongoClient.connect(url, (err, client) => {
  if (err) throw err;
  
  db = client.db(dbName);
})

module.exports = db;