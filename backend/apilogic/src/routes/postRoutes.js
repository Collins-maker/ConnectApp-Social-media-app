const express = require('express');
const {insertPost,updatePost,getAllPosts,getPostByID,getUserPosts, deletePost, getFeedPosts} = require('../controllers/postsControllers');
const{sessionAuth} =require('../middlewares/sessionAuth')
const { post } = require('./userRoutes');

const postRoutes = express.Router();

postRoutes.use(sessionAuth);

postRoutes.get('/posts', getAllPosts);
postRoutes.get('/posts/:post_id',getPostByID);
postRoutes.get('/posts/:user_id',getFeedPosts);
postRoutes.get('/user/posts', getUserPosts);
postRoutes.post('/post',insertPost);
postRoutes.put('/post',updatePost);
postRoutes.delete('/posts/:post_id', deletePost);

module.exports = postRoutes;

