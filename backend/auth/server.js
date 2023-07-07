const express = require("express");

require("dotenv").config();
const session = require('express-session');
const { v4 } = require('uuid');

const app = express();
const authorize = require('./src/middlewares/session')


const authenticationRoutes = require('./src/routes/authenticationRoutes')

app.use(express.json());

const oneDay = 60 * 60 * 1000 * 24;
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  genid: ()=>v4(),
  resave: false,
  cookie:{
    httpOnly: false,
    secure:false,
    maxAge: oneDay
  }   
}))



app.get("/", (req, res) => {
  console.log(req.sessionID);
  res.send("Hello, Welcome to my ConnectApp"); 
});

app.get('/logout', (req,res) =>{
  req.session.destroy()
});






app.use(authenticationRoutes);




const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is loading ${port}`);
});
