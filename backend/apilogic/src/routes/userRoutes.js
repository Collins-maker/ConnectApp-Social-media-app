const express = require('express');
const {getAllUsers, getUsersByUsername, getUsersFollowers} =require('../controllers/userControllers')

const userRoutes = express.Router();

userRoutes.get('/users',getAllUsers);
userRoutes.get('/users/:username',getUsersByUsername);
userRoutes.get('/users/:user_id',getUsersFollowers);

module.exports = userRoutes