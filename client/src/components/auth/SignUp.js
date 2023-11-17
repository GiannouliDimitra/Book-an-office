import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
     alert(res.data.msg);
     navigate("/login");
    }

    return ( 
        <div>
            <h1>SignUp Form</h1>
            <form className='loginForm' onSubmit={handleSignUp}>
                <label htmlFor='name'> Name:</label>
                <input
                id='name'
                type='text'
                placeholder='Add your name..'
                value = {name}
                onChange = {(e) => setName(e.target.value)}
                />
                 <label htmlFor='email'> Email:</label>
                <input
                id='email'
                type='text'
                placeholder='Add your email..'
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                />
                 <label htmlFor='password'> Password:</label>
                <input
                id='password'
                type='password'
                placeholder='Add your password..'
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                />
                <button type='submit'>SignUp</button>
            </form>
        </div>
     );
}

export default SignUp ;