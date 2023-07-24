const express = require('express');
const {registerUser, loginUser, updateUserProfile} = require('../controllers/authenticationControllers');

const authenticationRoutes = express.Router();

authenticationRoutes.post('/register',registerUser);

authenticationRoutes.post('/login',loginUser);

authenticationRoutes.put('/update',updateUserProfile);


module.exports=authenticationRoutes;