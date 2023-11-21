import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import Logo from'../photos/markerIcon.png';
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
                <nav>
            <div className='navBarContainer'>
                <div className ="navLogoItem">
                    <img className="imageLogoNavbar" src={Logo}></img>
                </div>
            <div className ="navItem"><Link className ="navText" to='/'>Home</Link></div>
            <div className ="navItem"><Link className ="navText" to='/'>About</Link></div>
            <div className ="navItem"><Link className ="navText" to='/login'>Login</Link></div>
            <div className ="navItem"><Link className ="navText" to='/signup'>SignUp</Link></div>
            </div>
            </nav>
            ) : (
                <nav>
                <div className='navBarContainer'>
                    <div className='navLogoItem'>
                       <img className="imageLogoNavbar" src={Logo}></img>
                    </div>
                <div className ="navItem"><Link className ="navText" to='/profil'>Profil of {decoded.name}</Link></div>
                <div className ="navItem"><Link className ="navText" to='/'>Home</Link></div>
                <div className ="navItem"><Link className ="navText" to='/'>About</Link></div>
                <div className ="navItem"><Link className ="navText" to='/addForm'>Add an Office</Link></div>
                <div className ="navItem"><Link className ="navText" to='/offices'>Offices</Link></div>
                <div className ="navItem"><Link className ="navText" onClick={handleLogout} to='/login'>Logout</Link></div>
                </div>
                </nav>  
            )
            }
       </>       
     );
}

export default NavBar;