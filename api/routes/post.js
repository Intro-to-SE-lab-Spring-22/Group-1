let express = require('express');
let router = express.Router();
const AppUser = require("../models/users.model");
const Post = require("../models/posts.model");
const { update } = require('../models/users.model');

router.post("/timeline", async(req, res) => {
  // Create a post
  let newpost = await Post.create({ timelinePost: req.body.timelinePost, username: req.body.username })
      .catch(err => { res.json({ error: 1, message: err }) });
  if (!newpost) {
      res.json({ message: "Cannot create thought.", error: 1 })
  }
  // Find the associated user
  // Then update the user by pushing the post
  let newPostId = newpost._id;
  let usertimeline = await AppUser.findOneAndUpdate({ username: req.body.username }, {
      $push: { posts: newPostId }
  }, { new: true }).populate({ path: "posts", select: "-__v" }).select("-__v");

  res.json(usertimeline)
});

//Delete Post from user page and from post database
router.delete("/:postID", async(req, res) => {

  let deletedPost = await Post.findOne({_id:req.params.postID});
  let ownerOfDeletedPost = deletedPost.username;
          let idOfDeletedPost = deletedPost._id;
          // console.log({ deletedPost });
          var cascader = await AppUser.findOneAndUpdate({ username: ownerOfDeletedPost }, {
              $pull: { posts: idOfDeletedPost }
          }, { new: true }).populate({ path: "posts", select: "-__v" }).select("-__v");

  let UserAndPost = await Post.findOneAndDelete({ _id: req.params.postID }).then(async(deletedPost) => {
      if (!deletedPost)
          res.status(404).json({ message: "No post with this id. Did you delete more than once?", error: 1 });
  });

  res.json({ message: "Post deleted and post also deleted from associated user", user: UserAndPost });
}); 

module.exports=router