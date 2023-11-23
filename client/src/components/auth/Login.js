import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import "./login.css"


function Login () {
//states && variables
let [email, setEmail] = useState("");
let [password, setPassword] = useState("");
let decoded;
let token;
const navigate = useNavigate();

async function handleLogin(e) {
    try {
      e.preventDefault();
      let res = await axios.post("http://localhost:8000/login", {
          email,
          password,
      });
      token = res.data.token;
      console.log (token)

      // Save the token in the browser
      if(res.status === 200) {
        alert(res.data.msg);
        decoded = jwtDecode(token);
        console.log (decoded, token)
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (error) {
       alert("Can not login, please check your email or password.");
    }
  }


    return ( 
      <>
        <div className='loginMainContainer'>
        <form className='loginForm' onSubmit={handleLogin}>
          <h1 className='loginText'>Login</h1>
             <label className='loginLabel' htmlFor='email'> Email:</label>
            <input
            className='loginInput'
            id='email'
            type='text'
            placeholder='Add your email..'
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            />
             <label className='loginLabel' htmlFor='password'> Password:</label>
            <input
            className='loginInput'
            id='password'
            type='password'
            placeholder='Add your password..'
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            />
            <button className='loginBut' type='submit'>Login</button>
            <h4>To create an account <Link className='signUpLink' to='/signUp'> Sign UP</Link></h4>
        </form>
    </div>
    <Footer/>
      </>
     );
}

export default Login ;