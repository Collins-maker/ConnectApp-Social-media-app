const express = require("express");
const RedisStore = require("connect-redis").default;
const {createClient} = require("redis");
const sql = require("mssql");
const config = require("./src/config/config");
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');
const reactionRoutes = require('./src/routes/reactionsRoutes');

const cors = require('cors')
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({
  origin:'http://localhost:3000', 
  credentials:true,       
  optionSuccessStatus:200
}))




async function startApp() {
  try {
    const pool  = await sql.connect(config)
    await pool.connect();
    console.log("App connected to database");

    app.use((req, res, next) => {
      req.pool = pool; next()
    })

    const redisClient = createClient();
    redisClient.connect()
    console.log("connected to redis")

    const redisStore = new RedisStore({
      client: redisClient,
      prefix: ''
    })

app.use(async(req,res,next)=>{
  let cookie = req.headers['cookie']
  if (cookie && typeof cookie === 'string') {
    let sessionID = cookie.substring(16, 52);
    let session = await redisClient.get(sessionID);

    if (session) {
      let real_session = JSON.parse(session);
      next();
    }}else{
    res.status(403).json({
      success: false,
      message: "login to proceed"
    })
  }
})

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
