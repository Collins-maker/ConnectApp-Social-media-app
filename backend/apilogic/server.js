const express = require("express");

require("dotenv").config();

const app = express();

const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');
const reactionRoutes = require('./src/routes/reactionsRoutes');

app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello, Welcome to my ConnectApp");
});

app.use(userRoutes);

app.use(postRoutes);

app.use(reactionRoutes);




const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server is loading ${port}`);
});
