const express = require ("express");
const connection = require ("./connection");
const cors = require ("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require ("mongoose");
const userRouters = require("./routers/userRouter");
const officeRoutes = require("./routers/officeRouter");
const reservationRouters =require("./routers/reservationRouter");


const app = express();
const port = 8000;

//middleware 
app.use(express.json());
app.use(cors());

// Use the routers
app.use ("/", officeRoutes);
app.use("/", userRouters);
app.use("/", reservationRouters);

//bodyParser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//post the payment
app.post("/payment", cors(), async (req,res) => {
    let { amount, id } =req.body;
    try {
        const payment = await stripe.paymentIntents.create({ 
            amount,
            currency: "EUR",
            description:"booked office",
            payment_method:id,
            confirm: true,
            automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never',
            },
        });
console.log ("payment", payment)
res.json({
    message:"Payment successful",
    success:true
})
    } catch (error) {
        console.log("from trycatch", error); 
        res.status(500).send({ msg: "Internal server error. Payment failed." });
    }
}) 



app.listen (port, () => {
    console.log (`The server is working in port ${port}`)
});