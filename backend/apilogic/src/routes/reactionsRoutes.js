const express = require('express');
const {likePost, insertComment} = require('../controllers/reactionControllers')

const reactionRoutes = express.Router();

reactionRoutes.post('/like', likePost);

reactionRoutes.post('/comment', insertComment);


module.exports = reactionRoutes;