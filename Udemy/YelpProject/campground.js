const mongoose = require("mongoose");
const Schema = mongoose.Schema; //like an alias, a shortcut

const CampgroundSchema = new Schema({
    title:String,
    price:String,
    description:String,
    location:String
})

module.exports = mongoose.model("Campground",CampgroundSchema);