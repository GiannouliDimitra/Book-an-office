import { Link } from "react-router-dom";
import './footer.css';

function Footer() {
    return (  
        <div className="footerContainer">
            <div className ="footerItem"><Link className ="footerItemText" to='/'>Terms</Link></div>
            <div className ="footerItem"><Link className ="footerItemText" to='/contact'>Contact us to:</Link></div>
        </div>
    );
}

export default Footer;