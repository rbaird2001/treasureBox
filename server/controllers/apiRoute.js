//const MediaItem = require("../models/mediaItem")
const igdb = require("../services/igdb");
const db = require("../models/mediaItem") 
module.exports = function(app) { 
  app.get("/games/:name", async (req, res) => {
    try {
      //broad search for games with matching title returns arra
      const games = await igdb.post(
        "/games",
        `fields id,name,summary; limit 50; where name ~ *"${req.params.name}"*; sort popularity desc;`
      );

      //create array of returned igdb id's and make into csv list to use to query igdb cover art.
      //csv list needs to be in parenthesis for OR search of all id's
      let g2 = games.data.map(x => x.id);
      let g3 = `(${g2.join(",")})`;

      //search for cover art using csv list
      const covers = await igdb.post(
        "/covers",
        `fields game, url; limit 50; where game = ${g3};sort id asc;`
      );

      //convert returned cover art search results into object.
      //this will enable quick location of covert are for each game.
      let c1 = {};
      covers.data.forEach(element => {
        c1[element.game] = element;
      });

      //use returned game data to map new array that includes cover art.
      //If game id doesn't have matching cover art, use placeholder art
      const gamesList = games.data.map(x =>
        c1[x.id]
          ? {
              id: x.id,
              name: x.name,
              slug: x.slug,
              summary: x.summary,
              url: x.url,
              cover: `https:${c1[x.id].url}`.replace("t_thumb", "t_cover_big")
            }
          : {
              id: x.id,
              name: x.name,
              slug: x.slug,
              summary: x.summary,
              cover: "https://via.placeholder.com/150"
            }
      );

      res.json(gamesList);

      //     await igdb.post("/covers", `fields url; where name ~ *"${req.params.name}"*;`)
      //   ).data[0] || { url: "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.jennybeaumont.com%2Fwp-content%2Fuploads%2F2015%2F03%2Fplaceholder.gif&f=1&nofb=1" };
      //   res.json(game.data.map(g => ({ ...g, cover: `https:${url}` })));
    } catch (err) {
      console.log(err.response && err.response.data ? err.response.data : err);
    }
  });

  app.post("/games/:gameId",async (req,res)=>{
    console.log("testing!!");
    try{

      const [selectGame, gameCover] = await Promise.all([igdb.post(
        "/games",
        `fields id,name,summary,rating,popularity,url; where id = ${req.params.gameId};`
      ),
      await igdb.post(
        "/covers",
        `fields url; where game = ${req.params.gameId};`
      )])

      // console.log({selectGame: selectGame.data, gameCover: gameCover.data});

        db.create({
            title: selectGame.data[0].name,
            description:selectGame.data[0].summary,
            rating:selectGame.data[0].rating,
            covertArt:gameCover.data[0].url,
            igdbID:selectGame.data[0].id,
        });
        res.sendStatus(200);
    } catch(err) {
      console.log({params: req.params, err});
      res.sendStatus(500);
    }
  })

  app.get("/games/", async (req, res) => {
    const games = await db.find()
    games.data
  })

  //   app.get("/games/add", async(req,res)=>{
  //       try{
  //         const game = await igdb.post
  //       }
  //       catch(err){

  //       }
  //   })
};
