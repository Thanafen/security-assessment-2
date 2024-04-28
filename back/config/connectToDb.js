const mongoose = require("mongoose");

async function connectToDb() {
  await mongoose.connect(process.env.DB_URL);
}

module.exports = connectToDb;
