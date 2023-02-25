import mongoose from "mongoose";

let link = process.env.DATABASE_LINK;
// const server = "127.0.0.1:27017"; // REPLACE WITH YOUR DB SERVER
// const database = "fcc-Mail"; // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    console.log("Connecting...");
    mongoose
      .connect(link)
      .then(() => {
        console.log(
          "Database connection successful---------------------------"
        );
      })
      .catch((err) => {
        console.error("Database connection error", err);
      });
  }
}

if (!global.mongo) global.mongo = new Database();
/*
Prevents multiple connection due to hot reloading
*/

module.exports = mongoose;
