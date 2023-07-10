const express = require('express');
const {likePost, insertComment, replyComment} = require('../controllers/reactionControllers')

const reactionRoutes = express.Router();

reactionRoutes.post('/like', likePost);

reactionRoutes.post('/comment', insertComment);

reactionRoutes.post('/reply',replyComment);


module.exports = reactionRoutes;