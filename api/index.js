require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

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
const app = express();

//To parse data 
app.use(bodyParser.json())
const routes = require('./routes/routes');

//Testing to see if we have a homepage message
app.get("/",(req,res)=>res.send("welcome to homepage!")
)

//app.use('/api', routes)
let userRoute = require('./routes/users')
let dataRoute = require('./routes/auth')
let tryRoute = require('./routes/routes')

//Logs when our API has been accessed 
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})

app.use(userRoute)
app.use(dataRoute)
app.use(tryRoute)
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

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.info(`Server Started at ${PORT}`)
})
