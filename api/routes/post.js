let express = require('express');
let router = express.Router();
const User = require("../models/users.model");
const Post = require("../models/posts.model");

// Create a Post --> Working
router.post('/status', (req, res) => {
    //req.body
    if(!req.body){
        return res.status(400).send('Request Body is missing')
    }

    let userPost = new Post(req.body)
    userPost.save()
     .then(doc => {
         if(!doc || doc.length === 0){
             return res.status(500).send(doc)
         }
         res.status(201).send(doc)
     })
     .catch(err => {
         res.status(500).json(err)
     })
})

//Update Post --> not working
router.put('/status/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
          await post.updateOne({ $set: req.body });
          res.status(200).json("the post has been updated");
        } else {
          res.status(403).json("you can update only your post");
        }
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports=router