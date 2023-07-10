const mssql =require('mssql');
const config = require('../config/config');

 
 async function getAllUsers(req,res){

    let sql =await mssql.connect(config);

    if(sql.connected ){
        let results = await sql.request().execute('getAllUsers')
      //   query('SELECT * from users.userProfile');

       let users = results.recordset;
       res.json({
        success: true,
        message:"fetched products successfully",
        results:users
       })
    }

   
 }

 async function getUsersByUsername(req,res) {
   let username =req.params.username
   let sql = await mssql.connect(config)
   if (sql.connected) {
      let results =await sql.request()
                           .input('username',username)
                           .execute('getUserByUsername');
      // query(`select * from users.userProfile where username = '${username}'`);
      let user =results.recordset[0]; 
      res.json({
         success:true,
         message: 'user feltched successfully',
         results:user
      })
      
   }
 }

 async function getUsersFollowers(req, res) {
   let user_id = req.params.user_id;
   let users;
 
   try {
     let sql = await mssql.connect(config);
     if (sql.connected) {
       let results = await sql.request()
         .input('user_id', user_id)
         .execute('getUserFollowers');
 
       users = results.recordset;
       res.json({
         success: true,
         message: 'users fetched successfully',
         results: users
       });
     } else {
       res.status(500).json({
         success: false,
         message: 'Failed to connect to the database'
       });
     }
   } catch (error) {
     console.error(error);
     res.status(500).json({
       success: false,
       message: 'An error occurred while fetching the users'
     });
   }
 }
 


 module.exports ={getAllUsers, getUsersByUsername, getUsersFollowers}