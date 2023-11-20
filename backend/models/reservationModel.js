const mongoose = require("mongoose");

//reservation schema
const ReservationSchema = new mongoose.Schema({
    dates: Array,
    officePlace:String,
    userId: String,
    ownerId: String,
    officeId: String,
});

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = Reservation;