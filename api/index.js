//The next three lines are required for startup
//Dotenv allows us to work within a specified environment
//Express is a helpful tool for building APIs
//Mongoose is in reference to MongoDB --> who we are using for database
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose =  require("passport-local-mongoose");

//Connect to Database --> see .env for the Database_URL
const mongoString = process.env.MONGO_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


let path = require('path')
let bodyParser = require('body-parser')

//Create web server, refered as app
const app = express();

//We use bodyparse to parse data 
app.use(bodyParser.json())

//This brings to index the routes we've created
//All of our functions have been listed in users for now. Will have post route as well. 
let userRoute = require('./routes/users')
let postRoute = require('./routes/post')

//Logs when our API has been accessed 
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})

//The line below allows us to use userRoute
app.use(userRoute)
app.use(postRoute)
app.use(express.static('public'))

// Handler for 404 - Resource not found
app.use((req, res, next) => {
    res.status(404).send('We think you are lost!')
    next()
})

// Handler for 500
app.use((err, req, res, next) => {
    console.error(err.stack)

    res.sendFile(path.join(__dirname, './public/500.html'))
})

//Our app will start at PORT 4000 
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.info(`Server Started at ${PORT}`)
})


