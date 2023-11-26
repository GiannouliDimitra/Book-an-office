const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema({
    location: Array,
    place: String,
    photo: String,
    price: Number,
    availableDates: Array,
    reservationDates: Array,
    owner: { type:mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Office = mongoose.model("Office", officeSchema);

module.exports = Office;
