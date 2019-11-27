//const MediaItem = require("../models/mediaItem")
const igdb = require("../services/igdb");
module.exports = function(app) {
  app.get("/games/:id", async (req, res) => {
    try {
      const game = await igdb.post(
        "/games",
        `fields *; where id = ${req.params.id};`
      );
      const { url } = (
        await igdb.post("/covers", `fields url; where game = ${req.params.id};`)
      ).data[0] || { url: "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.jennybeaumont.com%2Fwp-content%2Fuploads%2F2015%2F03%2Fplaceholder.gif&f=1&nofb=1" };
      res.json(game.data.map(g => ({ ...g, cover: `https:${url}` })));
    } catch (err) {
      console.log(err.response && err.response.data ? err.response.data : err);
    }
  });
};
