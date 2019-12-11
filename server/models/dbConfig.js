//This establishes connectivity to the treasurebox database in Mongo
//we use Mongoose as the ORM to establish the connection.
const db = process.env.MONGODB_URI || "mongodb://localhost/treasurebox"
const mongoose = require("mongoose");

module.exports = mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});