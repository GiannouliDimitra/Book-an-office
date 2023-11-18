import { useNavigate } from 'react-router-dom';
import {BrowserRouter, Link} from "react-router-dom";
import ("./navBar.css")


function NavBar() {
    let token = localStorage.getItem("token");
    console.log(token)
    const navigate = useNavigate();

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
                    <div>
                        <h3>Welcome</h3>
                    </div>
                <div className ="navItem"><Link to='/'>Home</Link></div>
                <div className ="navItem"><Link to='/'>About</Link></div>
                <div className ="navItem"><Link to='/addForm'>Add an Office</Link></div>
                <div className ="navItem"><Link to='/offices'>Offices</Link></div>
                <div className ="navItem"><Link onClick={handleLogout}>Logout</Link></div>
                </div>
                </nav>  
            )
            }
       </>       
     );
}

export default NavBar;