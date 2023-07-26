import React from 'react';
import {BrowserRouter as Router, Routes,Route  } from "react-router-dom";
import Login from './pages/login/Login';
import Signup from './pages/register/Signup';
import Home from './pages/Home/Home';
import Profile from './pages/profile/Profile';
import UpdateUser from './components/updateProfile/UpdateProfile';





function App() {

  return (
   
    <Router>
      <Routes>
      
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path ='/profile/:user_id' element={<Profile/>}/>
        <Route  path="/update-user/:user_id" element={<UpdateUser/>} />
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
      

  );
}


export default App;
