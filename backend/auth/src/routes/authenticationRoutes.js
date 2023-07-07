const express = require('express');
const {registerUser, loginUser} = require('../controllers/authenticationControllers');

const authenticationRoutes = express.Router();

authenticationRoutes.post('/register',registerUser);

authenticationRoutes.post('/login',loginUser);


module.exports=authenticationRoutes;