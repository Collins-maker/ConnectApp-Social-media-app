const express = require('express');
const {getAllUsers, getUsersByUsername, getUsersFollowers, followUser, getUsersByUserId, updateUserProfile} =require('../controllers/userControllers');
const{sessionAuth} =require('../middlewares/sessionAuth');

const userRoutes = express.Router();

userRoutes.use(sessionAuth);
userRoutes.get('/users',getAllUsers);
userRoutes.get('/users/:username',getUsersByUsername);

userRoutes.get('/user/:user_id',getUsersByUserId);
userRoutes.get('/followers/:user_id',getUsersFollowers);
userRoutes.post('/follow/:user_id', followUser)
userRoutes.put('/users/:user_id', updateUserProfile)

module.exports = userRoutes