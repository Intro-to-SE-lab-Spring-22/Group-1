let express = require('express');
let router = express.Router();
const AppUser = require("../models/users.model");
const Post = require("../models/posts.model");

router.post("/status/:userid", async(req, res) => {
  // Create a post
  let newpost = await Post.create({ timelinePost: req.body.timelinePost, username: req.body.username, userID: req.params.userid })
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


router.put('/updatePost/:postID', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postID);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }} catch (err) {
      res.status(500).json(err);
    }
});

//Get Timeline
router.get("/findAllTimelines/:userid", async(req, res) => {
  let retThought = await Post.findById();
  res.json(retThought);
});

//Get user Timeline
router.get("/timeline/:username", async(req, res) => {
  let retUser = await AppUser.findOne({ username: req.params.username }).populate({ path: "posts", select: "-__v" }).populate({ path: "friends", select: "-__v" }).select("-__v");
  res.json(retUser);
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

//like or dislike a post
router.put("/:id/like", async (req, res) => {

  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.body.userId)) {
    await post.updateOne({ $push: { likes: req.body.userId } });
    res.status(200).json("The post has been liked");
  } else {
    await post.updateOne({ $pull: { likes: req.body.userId } });
    res.status(200).json("The post has been disliked");
  }
  
});


router.get("/TL/:userId", async (req, res) => {
  
  const currentUser = await AppUser.findById(req.params.userId);
  const userPosts = await Post.find({ userID: currentUser._id });
  const friendPosts = await Promise.all(
    currentUser.friends.map((friendId) => {
      return Post.find({ userID: friendId });
    })
  );
  res.status(200).send(userPosts.concat(...friendPosts));    

});

/*
const friendPosts = currentUser.friends.map((friendId) => {
      return Post.find({ userId: friendId });
    })
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  } 
*/

//get user's all posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await AppUser.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Email
router.put('/updatePost/:postID', async (req, res) => {
  let updatedPost = await Post.findOne({_id:req.params.postID});
  let toUpdate = updatedPost.timelinePost; 

  console.log(updatedPost); 
  console.log(toUpdate);

  Post.findOneAndUpdate({
      timelinePost: toUpdate
  }, req.body, {
      new: true
  })
      .then(doc => {
       res.json(doc)
      })
      .catch(err => {
          res.status(500).json(err)
      })
})


module.exports=router