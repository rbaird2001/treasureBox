//This is our Express server Router

const igdb = require("../services/igdb");
const db = require("../models/mediaItem");
const path = require("path");
const { formatGames } = require("../helpers");
module.exports = function(app) {
  
  //broad search for games with similar titles.
  app.get("/api/games/:name", async (req, res) => {
    try {
      const games = await igdb.post(
        "/games",
        `fields id,name,summary; limit 50; where name ~ *"${req.params.name}"*; sort popularity desc;`
      );

      //call helper function to process igdb.com results
      const gamesList = await formatGames(games);
      res.json(gamesList);

    } catch (err) {
      console.log(err.response && err.response.data ? err.response.data : err);
    }
  });

  //Add selected game to treasurebox database.
  app.post("/api/games/:gameId", async (req, res) => {
    try {
      let selectGame = await igdb.post(
        "/games",
        `fields id,name,summary,rating,popularity,url; where id = ${req.params.gameId};`
      );

      //process detail from search using helper application
      selectGame = await formatGames(selectGame);

      //Insert game into database
      db.create(selectGame[0]);
      res.sendStatus(200);
    } catch (err) {
      console.log({ params: req.params, err });
      res.sendStatus(500);
    }
  });

  //retrieve games from database as main display
  app.get("/api/shelf", async (req, res) => {
    const games = await db.find();
    //console.log(games);
    res.json(games);
  });

  //default routing to send back to React for processing.
  app.get("/*", function(req, res) {
    res.sendFile(
      path.join(__dirname, "..", "..", "client", "build", "index.html")
    );
  });
};


