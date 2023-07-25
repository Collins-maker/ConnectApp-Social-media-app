const mssql =require('mssql');
const config = require('../config/config');

async function likePost(req,res){
   let like =req.body;

   const user_id = req.session?.user.user_id;
try {
  let pool = req.pool;
  if (pool.connected) {
    let results =await pool.request() 
                           .input('post_id', like.post_id)
                           .input('user_id', user_id)
                           .execute('posts.likePost')

                           console.log(results)

}
res.status(200).json({
       success: true,
       message: 'Post liked successfully'
     });

} catch (error) {
  console.error("Error liking post:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while liking the post",
    });
}
  
}

async function insertComment(req,res){
    let comment =req.body;
    const user_id = req.session?.user.user_id;
    let commentPost;
 
     let sql = await mssql.connect(config);
     if (sql.connected) {
       let results =await sql.request()
                            .input('user_id', user_id)  
                             .input('post_id', comment.post_id)
                             .input('comment_text', comment.comment_text)
                             .execute('insertComment')
 
                             console.log(results)

    commentPost=results.recordset;
 
  }
  res.status(200).json({
         success: true,
         message: 'your comment posted successfully',
         results: commentPost
       });
 }


 async function getAllPostComments(req, res) {
  let post_id = req.params.post_id;
   // Declare the post variable here

  let pool = req.pool;
  if (pool.connected) {
    let results = await pool.request()
      .input('post_id', post_id)
      .execute('getAllPostComment');

    console.log(results.recordset);
    post = results.recordset; // Assign the value to the post variable
  }

  res.status(200).json({
    success: true,
    message: 'post comments fetched successfully',
    results: post // Use the post variable here
  });
}

//replying to a post
 async function replyComment(req,res){
let reply = req.body;
const replied_by_id =req.session?.user_id;
let sql = await mssql.connect(config);
if (sql.connected) {
  let results= await sql.request()
                        .input('replied_by_id',replied_by_id)
                        .input("comment_id", reply.comment_id)
                        .input("reply_text",reply.reply_text)
                        .execute('insertCommentReply');
  
  res.json({
    success: true,
    message: 'your reply saved',
  });
  
}else{
  res.status(500).json({
    success: false,
    message: 'Failed to connect to the database'
  });
}

 }

 




module.exports = {likePost,insertComment, replyComment, getAllPostComments};
