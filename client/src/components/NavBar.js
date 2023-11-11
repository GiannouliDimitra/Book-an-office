import { useNavigate } from 'react-router-dom';
import {BrowserRouter, Link} from "react-router-dom";
import ("./navBar.css")
function NavBar() {
    const navigate = useNavigate();

    return ( 
        <nav className='navBarContainer'>
            <div className ="navItem"><Link to='/'>Home</Link></div>
            <div className ="navItem"><Link to='/addForm'>Add an Office</Link></div>
        </nav>      
     );
}

export default NavBar;