require("dotenv");
const db = process.env.MONGODB_URI || "mongodb://localhost/treasurebox"
const mongoose = require("mongoose");
//const Article = require("../model/articleSchema");
//const Note = require("./noteSchema");

module.exports = mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});