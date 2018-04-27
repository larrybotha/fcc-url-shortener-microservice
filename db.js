const MongoClient = require('mongodb').MongoClient;

const urlString = process.env.DB_URL_STRING;
const dbName = process.env.DB_NAME;

// https://zellwk.com/blog/crud-express-mongodb/
// https://dev.to/aurelkurtula/building-a-restful-api-with-express-and-mongodb--3mm\h
// http://mongodb.github.io/node-mongodb-native/3.0/api/MongoClient.html#.connect
// https://webapplog.com/express-js-4-node-js-and-mongodb-rest-api-tutorial/

const createConnection = () => {
  MongoClient.connect(`${urlString}/${dbName}`, (err, client) => {
    if (err) throw err;

    const db = client.db(dbName);
    
    module.exports.db = db;
  })
}

module.exports.init = createConnection;