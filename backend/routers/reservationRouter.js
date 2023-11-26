const express = require ("express");
const router = express.Router();
const { 
    findReservations, 
    addReservation, 
    updateReservation, 
    deleteReservation, 
} = require ("../controllers/reservationController");

//get
router.get("/reservations", findReservations);

//post
router.post("/reservation", addReservation);

//put
router.put ("/:id", updateReservation);

//delete
router.delete("/reservation/:id", deleteReservation);

module.exports = router;