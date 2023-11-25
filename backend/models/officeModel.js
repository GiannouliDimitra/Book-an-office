const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema({
    location: Array,
    place: { type: String, required:true } ,
    photo: { type: String, required:true },
    price: { type: Number, required:true },
    availableDates: Array,
    reservationDates: Array,
    owner: { type:mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Office = mongoose.model("Office", officeSchema);

module.exports = Office;
