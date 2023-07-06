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


 module.exports ={getAllUsers, getUsersByUsername}