const router = require("express").Router(); 

router.get("/",(req,res)=>{
    res.send("User Route Working")
})

module.exports=router