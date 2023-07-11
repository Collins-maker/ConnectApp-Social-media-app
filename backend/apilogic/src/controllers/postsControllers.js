const mssql =require('mssql');
const config = require('../config/config');

 
 async function getAllPosts(req,res){

  let pool = req.pool;

    if(pool.connected ){
        let results = await pool.request().execute('getAllPosts')
      //   query('SELECT * from posts.postsTable');

       let posts = results.recordset;
       res.json({
        success: true,
        message:"fetched products successfully",
        results:posts
       })
    }

   
 }

 async function getUserPosts(req,res) {
   let user_id =req.params.user_id
   let pool = req.pool;
   if (pool.connected) {
      let results =await pool.request()
                           .input('user_id',user_id)
                           .execute('getUserPosts');
      // query(`select * from posts.userProfile where user_id = '${user_id}'`);
      let user =results.recordset[0]; 
      res.json({
         success:true,
         message: 'user feltched successfully',
         results:user
      })
      
   }
 }

 //inserting posts

 async function insertPost(req, res){
    let post =req.body;

    let pool = req.pool;
    if (pool.connected) {
      let results =await pool.request()
                            .input('user_id', post.user_id)
                            .input('written_text', post.written_text)
                            .input('image_url',post.image_url)
                            .input('video_url',post.video_url)
                            .execute('insertPost')

                            console.log(results)

 }
 res.status(200).json({success:true, message:'posted successfully'});
}

//update posts
async function updatePost(req, res){
    let post =req.body;

    let pool = req.pool;
    if (pool.connected) {
      let results =await pool.request()
                            .input('post_id', post.user_id)
                            .input('written_text', post.written_text)
                            .input('image_url',post.image_url)
                            .input('video_url',post.video_url)
                            .execute('updatePost')

                        
const updatedPost =results.recordset;
 }
 res.status(200).json({
        success: true,
        message: 'Post updated successfully',
        results: updatePost
      });
}

//get postby id
async function getPostByID(req, res) {
  let post_id = req.params.post_id;
  let post; // Declare the post variable here

  let pool = req.pool;
  if (pool.connected) {
    let results = await pool.request()
      .input('post_id', post_id)
      .execute('getPostByID');

    console.log(results);
    post = results.recordset; // Assign the value to the post variable
  }

  res.status(200).json({
    success: true,
    message: 'post fetched successfully',
    results: post // Use the post variable here
  });
}


//delete a post
async function deletePost(req, res){
    let post_id =req.params.post_id;

    let pool = req.pool;
    if (pool.connected) {
      let results =await pool.request()
                            .input('post_id', post_id)
                            .execute('deletePost')

                            // console.log(results)

 }
 res.status(200).json({success:true, message:'post deleted successfully'});
}

async function getFeedPosts(req, res){
    let post =req.params.user_id;

    let pool = req.pool;
    if (pool.connected) {
      let results =await pool.request()
                            .input('user_id', user_id)
                            .execute('getFeedPosts')

                            console.log(results)

 }
 res.status(200).json({
  success:true, 
  message:'posts from friends fetched successfully',
  results:post
});
}






 module.exports ={getAllPosts, getUserPosts, insertPost, updatePost,getPostByID, deletePost,getFeedPosts}