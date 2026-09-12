require('dotenv').config()

const { json } = require("express");
const app = require("./src/app");
const connectDB= require("./src/configure/db");
const { configDotenv } = require("dotenv");


connectDB();
app.listen(3000,()=>{
    console.log("server is running at port 3000")
});