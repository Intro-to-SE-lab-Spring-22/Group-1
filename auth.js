const router = require("express").Router(); 
const User = require("../models/Users")

//Register User
router.post("/register",async(req,res)=>{
    //registering new user
    const app_user = await new User({
        name: req.body.name,
        email: req.body.email, 
        password: req.body.password

    })
    try {
        //save user and return appropriate response
        const newAppUser = await app_user.save()
        res.status(201).json(newAppUser)
    } catch (error) {
        res.status(400).json( { message: error.message} )
    }
});


router.get("/",(req,res)=>{
    res.status(201).json("Auth Route Working")
});


module.exports = router;