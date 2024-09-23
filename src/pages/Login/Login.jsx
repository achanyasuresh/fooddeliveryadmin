/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  // const url = "https://fooddeliverybackend-29bk.onrender.com";
  const url = " http://localhost:4000";
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    const newUrl = `${url}/api/user/login`;
    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        onLogin(); // Notify App.js about the successful login
        navigate('/addfood'); // Navigate to the protected route
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className='login'>
      <form onSubmit={onLoginSubmit} className="login-container">
        <div className="login-title">
          <h2>Login</h2>
        </div>
        <div className="login-inputs">
          <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Password' required />
        </div>
        <button type='submit'>Login</button>
        <div className='login-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        <p>Dont have an account? <span onClick={() => navigate('/register')}>Sign up here</span></p>
      </form>
    </div>
  );
};

export default Login;
