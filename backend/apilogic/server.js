const express = require("express");
const RedisStore = require("connect-redis").default
const {createClient} = require("redis");
const sql = require("mssql");
const config = require("./src/config/config");

require("dotenv").config();

const app = express();

const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');
const reactionRoutes = require('./src/routes/reactionsRoutes');

app.use(express.json());

const pool  = new sql.ConnectionPool(config)
async function startApp() {
  try {
    await pool.connect();
    console.log("App connected to database");


    app.use((req, res, next) => {req.pool = pool;next();});

    // app.use((req, res, next)=>{
    //   const cookie = req.headers.cookie;
    //   let SessionId = 
    //   if
    //   req.secure
    //   console.log(cookie)
    // })

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

} catch (error) {
  console.log("Error connecting to the database");
  console.log(error);
}
}

startApp();
