/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Register.css'; // You might want to rename this to something more general like Auth.css
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const url = "http://localhost:4000";
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onRegister = async (event) => {
    event.preventDefault();
    const newUrl = `${url}/api/user/register`;
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      navigate('/addfood');
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className='login'>
      <form onSubmit={onRegister} className="login-container">
        <div className="login-title">
          <h2>Sign Up</h2>
        </div>
        <div className="login-inputs">
          <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' required />
          <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Password' required />
        </div>
        <button type='submit'>Create account</button>
        <div className='login-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        <p>Already have an account? <span onClick={() => navigate('/login')}>Login here</span></p>
      </form>
    </div>
  );
};

export default Register;
