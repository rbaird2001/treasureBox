const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

app.use((req,res,next) => {
  // will need to change when we go to production
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./controllers/apiRoute")(app)

app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });