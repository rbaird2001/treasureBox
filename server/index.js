require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const path = require("path");

// Serve static content for the app
app.use(express.static(path.join(__dirname, "..", "client", "build")));
// Enable CORS when in dev and disable when in production.
if(!(process.env.NODE_ENV === "production")) {
  app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
}

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//establish url paths for used by Express Server
require("./controllers/apiRoute")(app)

//Start the web service
app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });