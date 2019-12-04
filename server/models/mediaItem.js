db = require("./dbConfig")

const MediaItem = new Schema({
    title: {type:string,required:true,},
    class:{type:string,required:true,},
    upc:{type:string,},
    rating:{type:string,},
    mediaType:{type:string,},
    platform:{type:string,},
    genre:{type:string,},
    description:{type:string,},
    covertArt:{type:string},
});

module.exports = MediaItem;

