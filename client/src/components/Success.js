import { useNavigate } from 'react-router-dom';
import ("./success.css");

function Success() {
const navigate = useNavigate();

    return ( 
        <div className ="successMainContainer">
            <h2 className='successTitle'> Your payment is completed successfully!</h2>
            <button className='successBut' onClick={() =>{
                 navigate("/")
            }}>Go back</button>
        </div>
     );
}

export default Success;