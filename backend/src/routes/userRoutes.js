const express = require('express');
const {getAllUsers, getUsersByUsername} =require('../controllers/userControllers')

const router = express.Router();

router.get('/users',getAllUsers);
router.get('/users/:username',getUsersByUsername);

module.exports=router