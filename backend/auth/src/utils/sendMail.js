const {createTransport}= require("nodemailer");

const email_config =require('../config/emailConfig');

const message_options ={
    to:"mtumishicollins@gmail.com",
    from: process.env.USER_EMAIL ,
    subject: "Email testing || send from Nodemailer",
    text: "wow it works even again"
}


const transporter = createTransport(email_config);

async function sendMail(){
    try {
        let results =await transporter.sendMail(message_options);
        console.log(results);
    } catch (error) {
      console.log(error); 
    }
}

module.exports = sendMail;