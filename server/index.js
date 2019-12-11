require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const mongojs = require("mongojs");
const path = require("path");

app.use(express.static(path.join(__dirname, "..", "client", "build")));


app.use((req,res,next) => {
  // will need to change when we go to production
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// Serve static content for the app from the "public" directory in the application directory.

app.use(express.static(__dirname + "../client/build"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./controllers/apiRoute")(app)

app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });