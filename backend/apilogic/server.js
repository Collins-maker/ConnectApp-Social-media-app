const express = require("express");

require("dotenv").config();

const app = express();

const userRoutes = require('./src/routes/userRoutes');
const router = require('./src/routes/signUpRoutes');
const signUpRoutes = require("./src/routes/signUpRoutes");
const loginRoutes = require('./src/routes/loginRoutes')

app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello, Welcome to my ConnectApp");
});

app.use(userRoutes);

app.use(signUpRoutes);
app.use(loginRoutes);



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is loading ${port}`);
});
