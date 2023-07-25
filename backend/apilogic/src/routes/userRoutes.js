const express = require('express');
const {getAllUsers, getUsersByUsername, getUsersFollowers, followUser} =require('../controllers/userControllers');
const{sessionAuth} =require('../middlewares/sessionAuth');

const userRoutes = express.Router();

userRoutes.use(sessionAuth);
userRoutes.get('/users',getAllUsers);
userRoutes.get('/users/:username',getUsersByUsername);
userRoutes.get('/users/:user_id',getUsersFollowers);
userRoutes.post('/follow/:user_id', followUser)

module.exports = userRoutes