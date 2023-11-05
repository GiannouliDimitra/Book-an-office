const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema({
    location: Array,
    name: String,
    photo: String,
    price: Number,
    isAvailable: { type:Boolean, default:true },
});

const Office = mongoose.model("Office", officeSchema);

module.exports = Office;
