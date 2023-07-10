const mssql =require('mssql');
const config = require('../config/config');

async function likePost(req,res){
   let like =req.body;

    let sql = await mssql.connect(config);
    if (sql.connected) {
      let results =await sql.request()  
                            .input('post_id', like.post_id)
                            .input('user_id', like.user_id)
                            .execute('posts.likePost')

                            console.log(results)

 }
 res.status(200).json({
        success: true,
        message: 'Post liked successfully'
      });
}

async function insertComment(req,res){
    let comment =req.body;
    let commentPost;
 
     let sql = await mssql.connect(config);
     if (sql.connected) {
       let results =await sql.request()
                            .input('user_id', comment.user_id)  
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

//replying to a post
 async function replyComment(req,res){
let reply = req.body;
let sql = await mssql.connect(config);
if (sql.connected) {
  let results= await sql.request()
                        .input('replied_by_id',reply.replied_by_id)
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

 




module.exports = {likePost,insertComment, replyComment};
