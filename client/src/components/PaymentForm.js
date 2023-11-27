import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ("./paymentForm.css");

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#ccc",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize:"16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd"}
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

function PaymentForm( { office, reservation }) {

const [success, setSuccess] = useState(false);
const stripe = useStripe();
const elements = useElements();
const navigate = useNavigate();

const handleSubmit = async (e) => {
   e.preventDefault()
   const { error, paymentMethod } = await stripe.createPaymentMethod({
    type:"card",
    card: elements.getElement(CardElement)
   })
    if(!error){
        try {
            const {id} = paymentMethod
            const res = await axios.post("http://localhost:8000/payment",{
            amount: office.reservation.totalPrice*100,
            id 
            })
            if(res.data.success) {
                console.log("successfull payment")
                setSuccess(true)
            } else {
                console.log("from trycatch",error)
            }
        } catch (error) {
            console.log("did get into try",error)
        }
    }
};

console.log("the office",office, "the reservation is", reservation)
    return ( 
        <div>
        {!success ? ( <div className="paymentMainContainer">
            <div> 
                <h2>Ways of payment</h2>
                <h4>You can pay by communicating with {office.reservation.ownerId.name} at {office.reservation.ownerId.email}</h4>
                <h4>Or you can pay by card:</h4>
                <h4>Total cost {office.reservation.totalPrice} euro</h4>
            </div>
            <form onSubmit ={handleSubmit}>
            <fieldset className="FormField">
                <div className="formRow">
                    <CardElement className="cardElement"options ={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button>Pay</button>
        </form> 
        <button onClick={() =>navigate ("/")}>Go back to the offices</button>
        </div>
        ) : (
            <div>
                <h2>You bought the reservation</h2>
                <button onClick={() =>navigate ("/profil")}>Go to your Profil</button>
            </div> 
        )
        }
        </div>
     )
}

export default PaymentForm;