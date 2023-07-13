import React from 'react';
import {BrowserRouter as Router, Routes,Route  } from "react-router-dom";
import Signup from './pages/Register/Signup';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';





function App() {

  return (
   
    <Router>
      <Routes>
      
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path ='/'element={<Home/>}/>
      </Routes>
    </Router>
      

  );
}


export default App;
