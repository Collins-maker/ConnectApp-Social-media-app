const config = require("../config/config");
const mssql = require("mssql");
const bcrypt = require("bcrypt");
const authorize = require("../middlewares/session");
const markup = require('../utils/markup')
const sendMail = require('../utils/sendMail')
require("dotenv").config()


//signup user 

 async function registerUser(req,res){
    let user = req.body;
    

    let hashed_pwd= await bcrypt.hash(user.password, 8);

    let sql = await mssql.connect(config);
    if (sql.connected) {
      
      
      let results =await sql.request()
                      .input('first_name', user.first_name)
                      .input('last_name', user.last_name)
                      .input('username', user.username)
                      .input('email_adress', user.email_address)
                      .input('password', hashed_pwd)
                      .execute('insertUser')

                      console.log(results)

                      if (results.rowsAffected[0] > 0) {

                        // Templating
            
                        const html = await markup('./src/views/signup.ejs', {
            
                            name: user.username,
            
                            text: "At our social media platform, you'll find a wide range of things in various genres, from stories to pictures. Feel free to explore the social media platform, find your next favorite person, and enjoy the friendship journey. If you have any questions or need assistance, don't hesitate to reach out to our friendly staff.",
            
                        });
            
            
                        const message_options = {
            
                            to: user.email_address,
            
                            from: process.env.USER_EMAIL,
            
                            subject: 'Registration to Connect Social Media',
            
                            html: html,
            
                        };
            
            
            
            console.log(user);
                        await sendMail(message_options);
            
                        
            
            
            
            
                        return res.status(201).json({
            
                            success: true,
            
                            message: 'User has been created',
            
                            data: results.recordset,
            
                        });
                      }
                    }
            
                     else {
            
                        return res.status(500).json({
            
                            success: false,
            
                            message: 'user not inserted',
            
                        });
            
                    }
    }



async function loginUser(req, res) {
    let { username, password } = req.body;

    try {
      let sql = await mssql.connect(config);
      
        let results = await sql
          .request()
          .input("username", username)
          .execute("getUserByUsername");
        let user = results.recordset[0];
        if (user) {
          let passwords_match = await bcrypt.compare(password, user.password);
          if (passwords_match) {

            req.session.authorized =true;
            req.session.user =user;
            console.log('some')
            

            res.json({ sucess: true, message: "logged in successfully" });
          } else {
            res.status(401).json({ success: false, message: "Wrong password" });
          }
        }else{
            res.status(404).json({succes: false, message:"no user found"});
        }
      
    } catch (error) {
        console.log(error);
    }
  }

  async function updateUserProfile(req,res) {
    let user = req.body;
    const user_id = req.session?.user.user_id;

    let pool = req.pool;
    if (pool.connected) {
      let results =await pool.request()
                              .input('gender', user.gender)
                              .input('country', user.country)
                              .input('phone_number',user.phone_number)
                              .input('date_of_birth', date_of_birth)
                              .input('profile_image', user.profileImg)
                              .input('bio_data', user.bio_data)
                              .execute('updateUser')


                              res.status(200).json({
                                success: true,
                                message: 'Post updated successfully',
                                results: updatePost
                              });

  }
}

  module.exports={ registerUser, loginUser, updateUserProfile}


