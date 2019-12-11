//This sets up our schema for our database and creates
//   our collection from the model.
db = require("./dbConfig")
const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const MediaItemSchema = new Schema({
    name: {type:String,required:true,},
    rating:{type:String,},
    summary:{type:String,},
    url:{type:String},
    id:{type:String}
});

const MediaItem = model('MediaItem', MediaItemSchema);

module.exports = MediaItem;

