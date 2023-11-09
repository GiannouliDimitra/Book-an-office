const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema({
    location: Array,
    place: String,
    photo: String,
    price: Number,
    isAvailable: { type:Boolean, default:true },
    availableDates: { type:Array },
});

const Office = mongoose.model("Office", officeSchema);

module.exports = Office;
