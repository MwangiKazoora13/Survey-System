const sqlite3 = require('sqlite3').verbose();
const database = ('database.db');

//Retrieve the database
const db = new sqlite3.Database(database, (err) => {
  db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='user_answers'",
    (error, row) => {
      if (error) {
        console.error(error.message);
      } else {
        if (row) {
          console.log("user_answers table exists in the database");
        } else {
          console.log("user_answers table does not exist in the database");
        }
      }
    }
  );
  
//input data into the database
    db.run(`
      CREATE TABLE IF NOT EXISTS user_answers (
          id INTEGER PRIMARY KEY,
          company_name TEXT,
          company_email TEXT,
          number INTEGER,
          location TEXT,
          recommendation TEXT,
          services TEXT,
          comment TEXT
          timestamp TIMESTAMP
      )
    `);
  })
  module.exports = db;