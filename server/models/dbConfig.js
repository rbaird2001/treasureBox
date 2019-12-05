require("dotenv");
const db = "mongodb://localhost/tbox" || process.env.MONGODB_URI;
const mongoose = require("mongoose");
//const Article = require("../model/articleSchema");
//const Note = require("./noteSchema");

module.exports = mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});