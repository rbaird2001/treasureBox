const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const mongojs = require("mongojs");
const axios = require("axios");
const cheerio = require("cheerio");


// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello world");
});


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

// Database configuration
var databaseUrl = "treasureBox";
var collections = ["games"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Retrieve data from the db
app.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.treasureBox.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
});

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request via axios for the news section of `ycombinator`
  axios.get("https://news.ycombinator.com/").then(function(response) {
    // Load the html body from axios into cheerio
    var $ = cheerio.load(response.data);
    // For each element with a "title" class
    console.log($(".title").children());
    $(".title").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).children("a").text();
      // var link = $(element).children("a").attr("href");

      // If this found element had both a title and a link
      if (title) {
        // Insert the data in the scrapedData db
        db.games.insert({
          title: title,
        },
        function(err, inserted) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          }
          else {
            // Otherwise, log the inserted data
            console.log(inserted);
          }
        });
      }
    });
  });

  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});


app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });