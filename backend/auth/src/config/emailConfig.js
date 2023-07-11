require('dotenv').config()
const email_config= {

    host:'smtp.gmail.com',

    port: 587,

    secure: false,

    requireTLS: true,

    auth: {

        user: process.env.USER_EMAIL,

        pass: process.env.PWD

    }

}

module.exports = email_config