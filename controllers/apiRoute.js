const MediaItem = require("../models/mediaItem")
const igdb = require("../services/igdb")
module.exports = function(app){
    app.get("/games/:id",async (res,req)=>{
        const games =  await igdb.post(`/games","fields *; where id = ${req.params.id}`)
    })};

    
