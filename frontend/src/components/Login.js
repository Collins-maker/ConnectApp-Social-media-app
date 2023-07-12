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
      {/* <h6>Have no account in Our Library?<Link to='/signup'>Register</Link> </h6> */}
      <h2>Login to Connect App</h2>

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
      <p>
        By creating an account you agree to the <a href="#">Terms of Service</a>. For more information about Library
        privacy practices, see the <a href="#">Library Privacy Statement</a>. We'll occasionally send you an account
        related usernames
      </p>
      </form>
    </div>
  );
}

export default Login;
