const express = require("express");
const app = express(); 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

dotenv.config();  // Will load all environment variables from .env
const mongoString = process.env.MONGO_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/",(req,res)=>{
    res.send("welcome to homepage!")
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(3000,()=>{
    console.log(`Server Started at ${3000}`)
})