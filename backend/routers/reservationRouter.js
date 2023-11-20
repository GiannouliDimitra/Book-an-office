const express = require ("express");
const router = express.Router();
/* const verifyToken = require ("../middleware/auth"); */
const { 
    findReservations, 
    addReservation, 
    updateReservation, 
    deleteReservation, 
} = require ("../controllers/reservationController");

//get
router.get("/reservations", findReservations);

//post
router.post("/reservation",/*  verifyToken, */ addReservation);

//put
router.put ("/:id", updateReservation);

//delete
router.delete("/:id", deleteReservation);

module.exports = router;