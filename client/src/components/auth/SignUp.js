import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Footer from '../Footer';
import "./signUp.css"

function SignUp () {
    //states
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let navigate = useNavigate();

    async function handleSignUp(e) {
     e.preventDefault();
     let res = await axios.post("http://localhost:8000/signUp", {
       name, email, password,
     });
     Swal.fire({text: res.data.msg,
        confirmButtonColor:"#B45931ff"
    });
     navigate("/login");
    }

    return ( 
        <div>
           <div className='signUpMainContainer'>
            <form className='signUpForm' onSubmit={handleSignUp}>
            <h1 className='signUpText'>SignUp Form</h1>
                <label className='signUpLabel' htmlFor='name'> Name:</label>
                <input
                className='signUpInput'
                id='name'
                type='text'
                placeholder='Add your name..'
                value = {name}
                onChange = {(e) => setName(e.target.value)}
                />
                 <label className='signUpLabel' htmlFor='email'> Email:</label>
                <input
                className='signUpInput'
                id='email'
                type='text'
                placeholder='Add your email..'
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                />
                 <label htmlFor='password'> Password:</label>
                <input
                className='signUpInput'
                id='password'
                type='password'
                placeholder='Add your password..'
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                />
                <button className='signUpBut' type='submit'>SignUp</button>
            </form>
        </div> 
        <Footer/>
        </div>
        
     );
}

export default SignUp ;