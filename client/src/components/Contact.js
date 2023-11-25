import Footer from "./Footer";
import './contact.css';

function Contact () {
    return ( 
        <div>
        <div className = "contactMainContainer">
            <div className="titleContactContainer">
                <p className="contactTitle"> If you want to communicate with us you can send an email at 
                 <span className="emailText"> giannouli.dimitra.ilianna@gmail.com </span>
              and we will answer to you as soon as possible! </p></div>
              </div>
            <Footer/>
        </div>
     );
}

export default Contact ;