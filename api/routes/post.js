let express = require('express');
let router = express.Router();
const AppUser = require("../models/users.model");
const Post = require("../models/posts.model");
const Comment = require("../models/comments.model");

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

router.post("/comment/:username/:postid", async(req, res) => {
  // Create a comment
  let newpost = await Comment.create({ postComment: req.body.postComment, username: req.params.username, postID: req.params.postid})
  if (!newpost) {
      res.json({ message: "Cannot create thought.", error: 1 })
  }

  // Find the associated user
  // Then update the user by pushing the post
  let newCommentId = newpost._id;
  let usertimeline = await Post.findOneAndUpdate({ _id:req.params.postid }, {
      $push: { comments: newCommentId }
  }, { new: true }).populate({ path: "comments", select: "-__v" }).select("-__v");

  res.json(usertimeline)
});

router.get('/getComment/:postID', async (req, res) => {
  const post = req.params.postID; 
  const commentGet = await Comment.find({postID: post});
  res.json(commentGet);
})

router.get('/getCommentsTrial/:postID', async (req, res) => {
  const post = req.params.postID; 
  const commentGet = await Comment.find({postID: post});
  res.json(commentGet);
})

router.post("/share/:username/:postid/:poster", async(req, res) => {
  let newpost = await Post.create({ timelinePost: "Original Post User - " + req.params.poster + ": \n\n" + req.body.timelinePost, username: req.body.username, userID: req.params.userid })
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
  let retUser = await AppUser.findOne({ username: req.params.username }).populate({ path: "posts", populate: {path: "comments", select: { postComment: 1 }}})
  res.json(retUser);
});

//Get Comments 
router.get("/comments/:username", async(req, res) => {
  let retUser = await Post.findOne({ username: req.params.username }).populate({ path: "comments", select: "-__v" }).populate({ path: "postComment", select: "-__v" }).select("-__v");
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

router.put("/comment/:postid/:commentersid", async (req, res) => {
  const post = await Post.findById(req.params.postid);
  const postUser = post.username;
  await post.updateOne({ $push: { comments: req.body } });
  appPost = await AppUser.findOne(postUser);
  await appPost.updateOne({ $push: { comments: req.body } })
  res.status(200).json("The post has been liked");
}); 

module.exports=router