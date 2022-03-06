let express = require('express');
let usermodel = require('../models/users.model');
let postmodel = require('../models/postmodel');
let router = express.Router();
//var {post, AppUser} = require("../../models");

router.post('/timeline/:userid', async(req, res) => {
    let posts = await postmodel.create({status: req.body.status})
        .catch(err => {res.json({err: 1, message: err}) 
        
    });
    if (!posts){
        res.json({message: 'cannot create', error: 1})
    }
    let newpost = posts._id
    let users = await usermodel.findOneAndUpdate({_id: req.body.userid},{$push: {posts: newpost}},{new: true}).populate({path: "posts", select: "-__v"}).populate({path: "friends", select: "-__v"}).select("-__v");
    res.json(users)
})