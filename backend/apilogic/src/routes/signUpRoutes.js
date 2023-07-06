const express = require('express');
const {registerUser} = require('../controllers/signUpControllers');

const signUpRoutes = express.Router();

signUpRoutes.post('/register',registerUser);


module.exports=signUpRoutes 