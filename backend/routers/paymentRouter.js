const express = require ("express");
const router = express.Router();
const { addPayment } = require ("../controllers/paymentController");


router.post(`/create-checkout`, addPayment) 

module.exports = router;