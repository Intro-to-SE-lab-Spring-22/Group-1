let express = require('express');
let router = express.Router();
const AppUser = require("../models/users.model");
const Post = require("../models/posts.model");
const Comment = require("../models/comments.model");

//The below call will make a status/post
router.post("/status/:userid", async(req, res) => {
  
  // Create a new post object
  let newpost = await Post.create({ timelinePost: req.body.timelinePost, username: req.body.username, userID: req.params.userid })
      .catch(err => { res.json({ error: 1, message: err }) });
  if (!newpost) {
      res.json({ message: "Cannot create thought.", error: 1 })
  }

  // Find the associated user
  // Then update the user by pushing the post to the user model posts array
  let newPostId = newpost._id;
  let usertimeline = await AppUser.findOneAndUpdate({ username: req.body.username }, {
      $push: { posts: newPostId }
  }, { new: true }).populate({ path: "posts", select: "-__v" }).select("-__v");

  res.json(usertimeline)
});

//Comment on a users post
router.post("/comment/:username/:postid", async(req, res) => {
  // Create a comment object
  let newpost = await Comment.create({ postComment: req.body.postComment, username: req.params.username, postID: req.params.postid})
  if (!newpost) {
      res.json({ message: "Cannot create thought.", error: 1 })
  }

  // Find the associated user
  // Then update the post model by pushing the comment to its comments array
  let newCommentId = newpost._id;
  let usertimeline = await Post.findOneAndUpdate({ _id:req.params.postid }, {
      $push: { comments: newCommentId }
  }, { new: true }).populate({ path: "comments", select: "-__v" }).select("-__v");

  res.json(usertimeline)
});

// Get the comments using the post id as a param
router.get('/getComment/:postID', async (req, res) => {
  const post = req.params.postID; 
  const commentGet = await Comment.find({postID: post});
  res.json(commentGet);
})

// Share a post
router.post("/share/:username/:postid/:poster", async(req, res) => {

  //Create a new psot object with the parameter and body
  let newpost = await Post.create({ timelinePost: "Original Post User - " + req.params.poster + ": \n\n" + req.body.timelinePost, username: req.body.username, userID: req.params.userid })
    .catch(err => { res.json({ error: 1, message: err }) });
  if (!newpost) {
    res.json({ message: "Cannot create thought.", error: 1 })
  }

  // Find the associated user
  // Then update the user by pushing the shared post to it's posts array
  let newPostId = newpost._id;
  let usertimeline = await AppUser.findOneAndUpdate({ username: req.body.username }, {
      $push: { posts: newPostId }
  }, { new: true }).populate({ path: "posts", select: "-__v" }).select("-__v");

  res.json(usertimeline)
});


//Update post using the post id as a param
router.put('/updatePost/:postID', async (req, res) => {
  try {
    //find the post by param ID 
    const post = await Post.findById(req.params.postID);

    //if it equals the logged in user's id then update
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }} catch (err) {
      res.status(500).json(err);
    }
});

//This is used as a test to get all timeline posts in the data base
router.get("/findAllTimelines/:userid", async(req, res) => {
  let retThought = await Post.findById();
  res.json(retThought);
});

//Get a certain users timeline and posts
router.get("/timeline/:username", async(req, res) => {
  let retUser = await AppUser.findOne({ username: req.params.username }).populate({ path: "posts", populate: {path: "comments", select: { postComment: 1 }}})
  res.json(retUser);
});

//Get comments using the username param
router.get("/comments/:username", async(req, res) => {
  let retUser = await Post.findOne({ username: req.params.username }).populate({ path: "comments", select: "-__v" }).populate({ path: "postComment", select: "-__v" }).select("-__v");
  res.json(retUser);
});

//Delete Post from user page and from post database
router.delete("/:postID", async(req, res) => {

  //Find the post that needs deleted, and some other needed information
  let deletedPost = await Post.findOne({_id:req.params.postID});
  let ownerOfDeletedPost = deletedPost.username;
  let idOfDeletedPost = deletedPost._id;

  //find the user and pull the post from there posts array
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


//Get a timeline using a specific user ID 
router.get("/TL/:userId", async (req, res) => {
  
  const currentUser = await AppUser.findById(req.params.userId);
  const userPosts = await Post.find({ userID: currentUser._id });
  const friendPosts = await Promise.all(
    currentUser.posts.map((postID) => {
      return Comment.find({ userID: postID });
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

//get user's all posts -- for profile information
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await AppUser.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Post
router.put('/updatePost/:postID', async (req, res) => {

  //Find the parameter post ID and get the post content (aka timelinePost)
  let updatedPost = await Post.findOne({_id:req.params.postID});
  let toUpdate = updatedPost.timelinePost; 

  //Find the post and replace the content with the req body
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

//Put a like in the posts likes array
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Put a comment in the Poss array
router.put("/comment/:postid/:commentersid", async (req, res) => {
  const post = await Post.findById(req.params.postid);
  const postUser = post.username;
  await post.updateOne({ $push: { comments: req.body } });
  appPost = await AppUser.findOne(postUser);
  await appPost.updateOne({ $push: { comments: req.body } })
  res.status(200).json("The post has been liked");
}); 

//Export functions
module.exports=router