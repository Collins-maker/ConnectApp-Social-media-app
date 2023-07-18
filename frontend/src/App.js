import React from 'react';
import {BrowserRouter as Router, Routes,Route  } from "react-router-dom";
import Login from './pages/login/Login';
import Signup from './pages/register/Signup';
import Home from './pages/Home/Home';
import Profile from './pages/profile/Profile';





function App() {

  return (
   
    <Router>
      <Routes>
      
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path ='/profile'element={<Profile/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
      

  );
}


export default App;
