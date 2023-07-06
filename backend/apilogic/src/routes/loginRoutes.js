const express = require('express');
const {loginUser} = require('../controllers/loginControllers');

const loginRoutes = express.Router();

loginRoutes.post('/login',loginUser);


module.exports=loginRoutes 