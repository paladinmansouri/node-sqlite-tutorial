const sqlite3 = require("sqlite3");

class Context {
  constructor(dbFilePath) {
    //سازنده ی کلاس
    this.db = new sqlite3.Database(dbFilePath, err => {
      if (!err) console.log("Connected to Database");
      else console.log("Could not connected to database", err);
    });

    this.run = (sql, params = []) => {
      return new Promise((resolve, reject) => {
        this.db.run(sql, params, function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        });
      });
    };

    this.get = (sql, params = []) => {
      return new Promise((resolve, reject) => {
        this.db.get(sql, params, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    this.all = (sql, params = []) => {
      return new Promise((resolve, reject) => {
        this.db.all(sql, params, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };
  }
}

module.exports = Context;
