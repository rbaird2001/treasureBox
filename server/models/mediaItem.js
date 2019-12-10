db = require("./dbConfig")
const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const MediaItemSchema = new Schema({
    title: {type:String,required:true,},
    rating:{type:String,},
    description:{type:String,},
    covertArt:{type:String},
    igdbID:{type:String}
});

const MediaItem = model('MediaItem', MediaItemSchema);

module.exports = MediaItem;

