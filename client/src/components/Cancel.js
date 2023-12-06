import { useNavigate } from 'react-router-dom';

function Cancel() {
const navigate = useNavigate();

    return ( 
        <div>
            <h2> Your payment is canceled</h2>
            <button onClick={() =>{
                navigate("/")
            }}>Go back</button>
        </div>
     );
}

export default Cancel;