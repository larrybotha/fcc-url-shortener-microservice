const MongoClient = require('mongodb').MongoClient;

const urlString = process.env.DB_URL_STRING;
const dbName = process.env.DB_NAME;

// https://zellwk.com/blog/crud-express-mongodb/
// https://dev.to/aurelkurtula/building-a-restful-api-with-express-and-mongodb--3mmh
// http://mongodb.github.io/node-mongodb-native/3.0/api/MongoClient.html#.connect
let db;

MongoClient.connect(`${urlString}/${dbName}`, (err, client) => {
  if (err) throw err;
  
  db = client.db();
})

module.exports = db;