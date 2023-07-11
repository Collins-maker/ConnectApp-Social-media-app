const {createTransport}= require("nodemailer");

const email_config =require('../config/emailConfig');

const transporter = createTransport(email_config);
// console.log(email_config)
async function sendMail(message_options){
    try {
        let results =await transporter.sendMail(message_options);
        console.log(results);
    } catch (error) {
      console.log(error); 
    }
}

module.exports = sendMail;