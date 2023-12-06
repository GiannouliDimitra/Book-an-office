const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
require("dotenv").config();
const express = require ("express");
const cors = require ("cors");

const app = express();
app.use(cors());

//post
const addPayment = async (req,res) => {
    try {
        const session = await stripe.checkout.sessions.create({ 
            payment_method_types:["card"],
            mode:"payment",
            line_items:req.body.items.map(item => {
                return{
                    price_data:{
                        currency: "EUR",
                        product_data:{
                            name:"BookTheOffice"
                        },
                        unit_amount: (item.amount)*100,
                    },
                    quantity:1
                }
            }),
            success_url:`http://localhost:3000/success`,
            cancel_url:`http://localhost:3000/cancel`
        })
        res.json({url:session.url})
  
    } catch (error) {
        res.status(500).send({ msg: "Internal server error. Payment failed." });
    }
};

module.exports = { addPayment }