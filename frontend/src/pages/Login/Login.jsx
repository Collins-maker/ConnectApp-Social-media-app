import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')

  const [uError,setuError] = useState();

  const [pError,setPerror] = useState();

  const navigate =useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const values = {
      username: username,
      password: password
    };
 
      try {
         const response = await axios.post('http://localhost:4000/login', values, {
          withCredentials: true
        })
        .then(res=>{
          
          navigate('/home')
        })
        
        // const token = response.data.token;
      } catch (error) {
        console.log(error)
        console.log(error.response.data.message);

        
        if(error.response.data.message ==='no user found' && error.response.data.message !=='Wrong password'){
          setuError(error.response.data.message)
          setPerror('')
        }else if(error.response.data.message !== 'no user found' && error.response.data.messagee === 'Wrong Password'){

          setPerror(error.response.data.message)
    
          setuError('')
    
        }
    
        else{
    
         
    
        console.log(error.response.data.message)
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
        <p style={{color:"red"}}>{uError}</p>
        <label htmlFor="password">
          password<span className="required">*</span>
        </label>
        <input type="password"
        value={password}
        required
        onChange={e=>setPassword(e.target.value)} />
        <p style={{color:"red"}}>{pError}</p>
        
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
