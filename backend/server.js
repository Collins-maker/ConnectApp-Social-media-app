const express = require("express");

require("dotenv").config();

const app = express();

const router = require('./src/routes/userRoutes')

app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello, Welcome to my ConnectApp");
});

app.use(router)



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is loading ${port}`);
});
