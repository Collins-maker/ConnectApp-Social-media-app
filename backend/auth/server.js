const express = require("express");
require("dotenv").config();
const session = require("express-session");
const { v4 } = require("uuid");
const authenticationRoutes = require('./src/routes/authenticationRoutes');
const config = require("./src/config/config");
const sql = require("mssql");
const RedisStore = require("connect-redis").default
const {createClient} = require("redis")
const authorize = require("./src/middlewares/session")

const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors({origin:"http://localhost:3000",credentials:true}));

const pool  = new sql.ConnectionPool(config)
async function startApp() {
  try {
    await pool.connect();
    console.log("App connected to database");

    const redisClient =  createClient();
    redisClient.connect()
    console.log("Connected to Redis")
    
    const redisStore = new RedisStore({
        client: redisClient,
        prefix: ''
    })


const oneDay = 60 * 60 * 1000 * 24;
app.use(
  session({
    store: redisStore,
    secret: process.env.SECRET,
    saveUninitialized: true,
    genid: () => v4(),
    resave: true,
    rolling: true,
    unset: 'destroy',
    cookie: {
      httpOnly: false,
      secure: false, //For production, set to true (HTTPS request)
      maxAge: oneDay,
      domain:'localhost'
    },
  })
);


    app.use((req, res, next) => {req.pool = pool;next();});



app.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sessionID'); // Replace 'sessionID' with the name of your session cookie
  res.send("Logout successfully");
});


app.use( authenticationRoutes);


    app.use((error, req, res, next) => {
      res.status(error.status).json(error.message);
    });

    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`Auth Server is listening on ${port}`);
    });
  } catch (error) {
    console.log("Error connecting to the database");
    console.log(error);
  }
}

startApp();