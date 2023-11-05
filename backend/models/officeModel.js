const mongoose = require("mongoose");

let Office_schema = new mongoose.Schema({
    location: Array,
    name: String,
    photo: String,
    price: Number,
    isAvailable: Boolean,
});

let Office = mongoose.model("Office", Office_schema);

module.exports = Office;
