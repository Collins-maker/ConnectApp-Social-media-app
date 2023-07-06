const express = require('express');
const {getAllUsers, getUsersByUsername} =require('../controllers/userControllers')

const userRoutes = express.Router();

userRoutes.get('/users',getAllUsers);
userRoutes.get('/users/:username',getUsersByUsername);

module.exports = userRoutes