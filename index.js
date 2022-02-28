const express = require("express");
const app = express(); 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const dataRoute = require("./routes/routes")

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
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"));
app.use(express.static('public'))

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/routes", dataRoute);

const express = require("express");
const app = express(); 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const dataRoute = require("./routes/routes")

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
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"));
app.use(express.static('public'))

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/routes", dataRoute)

app.get("/",(req,res)=>res.send("welcome to homepage!"))

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.info(`Server Started at ${PORT}`)
})
