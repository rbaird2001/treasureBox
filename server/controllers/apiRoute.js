//const MediaItem = require("../models/mediaItem")
const igdb = require("../services/igdb");
const db = require("../models/mediaItem");
const {formatGames} = require("../helpers")
module.exports = function(app) {
  app.get("/games/:name", async (req, res) => {
    try {
      //broad search for games with similar titles returns array
      const games = await igdb.post(
        "/games",
        `fields id,name,summary; limit 50; where name ~ *"${req.params.name}"*; sort popularity desc;`
      );

      //create array of returned igdb id's and make into csv list to use to query igdb cover art.
      //csv list needs to be in parenthesis for OR search of all id's
      const gamesList = await formatGames(games);
      res.json(gamesList);

      //     await igdb.post("/covers", `fields url; where name ~ *"${req.params.name}"*;`)
      //   ).data[0] || { url: "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.jennybeaumont.com%2Fwp-content%2Fuploads%2F2015%2F03%2Fplaceholder.gif&f=1&nofb=1" };
      //   res.json(game.data.map(g => ({ ...g, cover: `https:${url}` })));
    } catch (err) {
      console.log(err.response && err.response.data ? err.response.data : err);
    }
  });

  app.post("/games/:gameId", async (req, res) => {
    //console.log("testing!!");
    try {
      let selectGame = await igdb.post(
          "/games",
          `fields id,name,summary,rating,popularity,url; where id = ${req.params.gameId};`
        );

        selectGame = await formatGames(selectGame);

      // console.log({selectGame: selectGame.data, gameCover: gameCover.data});

      db.create(selectGame[0]);
      res.sendStatus(200);
    } catch (err) {
      console.log({ params: req.params, err });
      res.sendStatus(500);
    }
  });

  app.get("/shelf", async (req, res) => {
    const games = await db.find();
    console.log(games);
    res.json(games);
  });

  //   app.get("/games/add", async(req,res)=>{
  //       try{
  //         const game = await igdb.post
  //       }
  //       catch(err){

  //       }
  //   })
};
