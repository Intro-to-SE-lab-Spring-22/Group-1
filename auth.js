const router = require("express").Router(); 
const User = require("../models/Users");

router.post("/reg", (req,res)=>{
    const user = new User({
        username:"John",
        email:"john@email.com", 
        password:"123test"
    });

    user.save();
    res.send("okay")
});

router.get("/",(req,res)=>{
    res.send("Auth Route Working")
});

module.exports=router

module.exports = router;