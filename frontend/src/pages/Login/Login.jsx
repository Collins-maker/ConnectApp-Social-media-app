import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')

  const navigate =useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const values = {
      username,
      password
    };
  
    if (password && username) {
      try {
        const response = await axios.post('http://localhost:4000/login', values);
        // const token = response.data.token;
  
  
        
  
        navigate('/');
      } catch (error) {
        console.error('An error occurred during login:', error);
      }
    }
  };
  

  return (
    <div className="form-container">
      <form action="" onSubmit={handleSubmit}>
      
      <h2>Login</h2>



      <div className="label">
       
        
        <label htmlFor="username">
          username <span className="required">*</span>
        </label>
        <input type="text" 
        value={username}
        required
        onChange={e=>setUsername(e.target.value)}/>
        <label htmlFor="password">
          password<span className="required">*</span>
        </label>
        <input type="password"
        value={password}
        required
        onChange={e=>setPassword(e.target.value)} />
        
      </div>
      <p>
        Make sure it's at least  8 characters including a number and a lowercase letter.
      </p>
      
      <button>Login</button>
      
      <h6>Have no account account Yet?<Link to='/signup'>Register</Link> </h6>
      </form>
    </div>
  );
}

export default Login;
