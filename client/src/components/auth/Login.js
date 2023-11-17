import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login () {

let [email, setEmail] = useState("");
let [password, setPassword] = useState("");

let navigate = useNavigate();

async function handleLogin(e) {
    try {
      e.preventDefault();
      let res = await axios.post("http://localhost:8000/login", {
          email,
          password,
      });

      // Save the token in the browser
      if(res.status === 200) {
        alert(res.data.msg);
        console.log (res.data)
        let decoded = jwtDecode(res.data.token);
        console.log (decoded)
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
      
    } catch (error) {
       alert("Can not login, please check your email or password.");
    }
  }


    return ( 
        <div>
        <h1>Login Form</h1>
        <form className='loginForm' onSubmit={handleLogin}>
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
            <button type='submit'>Login</button>
        </form>
    </div>
     );
}

export default Login ;