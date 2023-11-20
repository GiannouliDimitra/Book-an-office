import { useNavigate } from 'react-router-dom';
import {BrowserRouter, Link} from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import ("./navBar.css")


function NavBar() {

    const navigate = useNavigate();
    let token;
    let decoded;
    try {
        token = localStorage.getItem("token");
        decoded = jwtDecode(token);
    } catch (error) {
        console.log(error)
    }
   
    function handleLogout () {
        if(token) {
            localStorage.removeItem("token");
            navigate("/login");
        } else {
            return;
        }
    }
    return ( 
       <>
        {!token? (
                <nav className='navBarContainer'>
            <div>
                <div>
                    <h2>Book an Office</h2>
                </div>
            <div className ="navItem"><Link to='/'>Home</Link></div>
            <div className ="navItem"><Link to='/'>About</Link></div>
            <div className ="navItem"><Link to='/login'>Login</Link></div>
            <div className ="navItem"><Link to='/signup'>SignUp</Link></div>
            </div>
            </nav>
            ) : (
                <nav className='navBarContainer'>
                <div>
                    <div>
                        <h2>Book an Office</h2>
                    </div>
                <div className ="navItem"><Link to='/profil'>Profil of {decoded.name}</Link></div>
                <div className ="navItem"><Link to='/'>Home</Link></div>
                <div className ="navItem"><Link to='/'>About</Link></div>
                <div className ="navItem"><Link to='/addForm'>Add an Office</Link></div>
                <div className ="navItem"><Link to='/offices'>Offices</Link></div>
                <div className ="navItem"><Link onClick={handleLogout} to='/login'>Logout</Link></div>
                </div>
                </nav>  
            )
            }
       </>       
     );
}

export default NavBar;