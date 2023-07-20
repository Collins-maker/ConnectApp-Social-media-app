const express = require('express');
const{sessionAuth} =require('../middlewares/sessionAuth');
const {likePost, insertComment, replyComment, getAllPostComments} = require('../controllers/reactionControllers')

const reactionRoutes = express.Router();

reactionRoutes.use(sessionAuth);

reactionRoutes.post('/like', likePost);

reactionRoutes.post('/comment', insertComment);

reactionRoutes.get('/comment/:post_id', getAllPostComments);

reactionRoutes.post('/reply',replyComment);


module.exports = reactionRoutes;