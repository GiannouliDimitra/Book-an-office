import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY="pk_test_51OH22RK95SGZyNvgorkS11RjxhTsDqlItZV75qvhvO2xyoEsYRY68Rcjfs7MpuDr4L4f8hQobp1HYva9gzxyL3vq00y6yI0ZrR";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripeContainer(  office, reservation ) {
    return ( 
        <Elements stripe ={stripeTestPromise}>
<PaymentForm 
office ={office}
reservation={reservation}/>
        </Elements>
     );
}

export default StripeContainer;