const igdb = require("../services/igdb");
module.exports.formatGames = async (games) => {
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
      return games.data.map(x => ({
        id: x.id,
        name: x.name,
        slug: x.slug,
        summary: x.summary,
        url: c1[x.id]
          ? `https:${c1[x.id].url}`.replace("t_thumb", "t_cover_big")
          : "https://via.placeholder.com/150"
      }));

}