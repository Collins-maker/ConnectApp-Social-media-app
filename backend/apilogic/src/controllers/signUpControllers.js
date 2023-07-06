const config =require('../config/config');
const mssql = require('mssql');
const bcrypt = require('bcrypt') 

module.exports ={
    registerUser: async(req,res)=>{
      let user = req.body;
    //   res.json(user)

      let hashed_pwd= await bcrypt.hash(user.password, 8);

      let sql = await mssql.connect(config);
      if (sql.connected) {
        let results =await sql.request()
                        .input('first_name', user.first_name)
                        .input('last_name', user.last_name)
                        .input('username', user.username)
                        .input('gender', user.gender)
                        .input('email', user.email_address)
                        .input('country', user.country) 
                        .input('phone_number',user.phone_number)
                        .input('date_of_birth', user.date_of_birth)
                        .input('password', hashed_pwd)
                        .execute('insertUser')

                        console.log(results)
      }
      res.send(hashed_pwd);
    }
}