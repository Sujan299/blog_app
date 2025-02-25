const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")

const postsRoutes = require("./routes/postRoute.route.js");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose")
const googleAuthRoutes = require("./routes/googleAuth.route.js")

app.use(express.json()); 
app.use(cookieParser()); // it parses incomming cookies from http
app.use(
    cors({
      origin: "https://blog-app-xi-henna.vercel.app/",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
const PORT = process.env.PORT || 4000
const URI = process.env.mongoDBURI;

app.use('/auth', googleAuthRoutes);
app.use("/", postsRoutes)



mongoose.connect(URI).then(()=>{
    console.log("monogoDB connected successfully !")
}).catch(()=>{
    console.log("Can not connect to mongodb")
})

app.listen(PORT, ()=>{
    console.log(`I am running on port ${PORT}`)
})