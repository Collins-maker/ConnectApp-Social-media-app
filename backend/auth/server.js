const express = require("express");

require("dotenv").config();
const session = require('express-session');
const { v4 } = require('uuid');

const app = express();

const signUpRoutes = require("./src/routes/signUpRoutes");
const loginRoutes = require('./src/routes/loginRoutes')

app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello, Welcome to my ConnectApp"); 
});

app.use(session({
  secret:process.env.SECRET,
  saveUninitialized: true,
  resave: false,
  cookie:{
    // httpOnly: false,
    // secure: true
  }   
}))




app.use(signUpRoutes);
app.use(loginRoutes);



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is loading ${port}`);
});
