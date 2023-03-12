require('dotenv').config();
const sequelize = require('sequelize');

// -----------------------------------------------
// Fetch env variables

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;
// -----------------------------------------------
const sqlConnectionUrl = `mysql://${DB_USER}:${DB_PASS}@localhost:${DB_PORT}/${DB_NAME}`;
const db = new sequelize(sqlConnectionUrl);
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
  
const getRecordFromDatabase = async (tablename, methodName, methodObj) => {
    try {
      console.log(tablename, methodName, methodObj)
      let result = await tablename[methodName](methodObj);
      return result;
    } catch (err) {
      console.log('Query failed', err);
      return err;
    }
};
  
module.exports = {db, getRecordFromDatabase} ;