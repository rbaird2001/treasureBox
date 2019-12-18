//This is our Express server Router

const igdb = require("../services/igdb");
const db = require("../models/mediaItem");
const path = require("path");
const passport = require("passport");
const { formatGames } = require("../helpers");
const upc = require("../services/upcsearch");
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

  // Fuzzy search useful when we have data coming from UPC
  app.get("/api/games/fuzzysearch/:name", async (req, res) => {
    try {
      const names = req.params.name.split(",");
      let query = "fields id,name,summary; limit 50; where ";
      query =
        query +
        ( names.map(name => `name ~ *"${name.trim()}"*`).join("|") )+
        "; sort popularity desc;";

        console.log(query);
      const games = await igdb.post("/games", query);

      //call helper function to process igdb.com results
      const gamesList = await formatGames(games);
      res.json(gamesList);
    } catch (err) {
      console.log('Error occurred');
      console.log(err.response && err.response.data ? err.response.data : err);
    }
  });

  //retrieve games from database as main display
  app.get("/api/shelf", async (req, res) => {
    const games = await db.find();
    //console.log(games);
    res.json(games);
  });

  /* GET Google Authentication API. */
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    })
  );

  //google post authentication callback
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/google",
      session: true
    }),
    function(req, res) {
      var token = req.user.token;
      res.redirect("/?token=" + token);
    }
  );

  app.get("/login", (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "..", "client", "build", "login.html")
    );
  });

  app.get("/api/upc/search/:upc", async (req, res) => {
    try {
      const upcRes = await upc.get(`lookup?upc=${req.params.upc}`);
      console.log(upcRes.data);
      let i = upcRes.data.items[0].title;
      let itemName = i.match(/[\b\s\w]+/g);
      res.json({ names: itemName });
    } catch (err) {
      console.log(err);
    }
  });

  //default routing to send back to React for processing.
  app.get("/*", function(req, res) {
    console.log(req.user);
    if (!req.user) {
      res.redirect("/login");
    } else {
      res.sendFile(
        path.join(__dirname, "..", "..", "client", "build", "index.html")
      );
    }
  });
};
