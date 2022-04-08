import "./post.css"
import Comment from "../comment/comment"
import { ControlPointDuplicateTwoTone, MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext, useRef } from "react"
import axios from 'axios'
import {format} from 'timeago.js'
import { Link, NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


export default function Post({post}) {
  
  // These are to be used for our post functions -- we need to get the likes (and set them), get comments and set them, and be able to access user information.
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const {user} = useContext(AuthContext);

  //This public file allows us to set images -- specifically an unidentified profile picture.
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //These are needed as used as references in the html code
  const timelinePost = useRef(); 
  const EditRef = useRef();

  //We can get user and post information from the post database
  const userID = post.userID; 
  const userName = post.username;
  const postID = post._id; 
  const postContent = post.timelinePost;

  //Below -- we can check the console to see what information is being passed
  //console.log("Post User ID: ", post.userID)
  //console.log("Comments? ", post.comments)


  //Handles the like button -- by either adding 1 or subtracting 1 (because a user can only perform 1 like/dislike per post)
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  //this will let us specifically like the post with the currently logged in user
  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  //this will let us get and set the comments from the post database (and show them in reverse)
  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/getComment/${post._id}`);
      console.log(res.data);
      setComments(
        res.data.reverse(comments.timestamp)
      );
    };
    fetchComment();
  }, [post._id]);

  //Calling this function will delete a post
  const deletePost = async (e) => {
    e.preventDefault(); 

    console.log("userID: ", post.userID)
    console.log("user_id ", user._id)

    if (userID === user._id || userID === undefined){
      //Specifically calls the delete function from the API here
      await axios.delete("/" + postID)
      window.location.reload();
    }
    else {
      console.log("Cannot delete post that are not yours")
    }
    
  } 

  //Calling this function will prompt the user to edit a post
  const editPost = async () => {
    const msg = "Edit Post?"
    if (user.username === post.username){
    //This will open up a dialog box for the user input
    const addDialog = ({ onClose }) => {

      //This handles the No button 
      const handleClickedNo = () => {
        alert('clicked no')
        onClose()
      }

      //This handles the yes button by getting the input text and changing the post
      const handleClickedYes = async () => {
        const newPost = {
          username: post.username,
          timelinePost: EditRef.current.value
        };

        console.log(newPost)

        alert('clicked yes')
        await axios.delete("/" + postID)
        window.location.reload();
        //Then set the post in the update box to be a new post
        await axios.post("/status/" + userID, newPost);
        window.location.reload();
        onClose()
      }

      //This is the specific HTML code for the Edit Post Dialog Box
      return (
        <div className='add-dialog'>
          <h3>Edit status?</h3>
          <p>{msg}</p>
          <div className="add-dialog-buttons">
          <input type="text" placeholder="Update Status Here!" id="update" ref={EditRef}></input>
          <button onClick={handleClickedNo}>No</button>
          <button onClick={handleClickedYes}>Yes</button>
          </div>
        </div>
      ) 
    }
         

  confirmAlert({ customUI: addDialog })
  }
  }

  //Calling this post will prompt a user to share a post / verify that they want to share a post
  const sharePost = async (e) => {
    e.preventDefault();

    //The below console logs lets us track what information is being used
    //console.log("SHARED POST FROM: ", userName)
    //console.log("Sharing " + userName + "'s post")
    //console.log("Post ID of what Post Being Shared: " + postID)
    //console.log("Post Being Shared: " + postContent)
    //console.log("Post comments? " + post.comments)
    //console.log("Current User: " + user.username)

    //This creates a new post object
    const newPost = {
      username: user.username,
      timelinePost: postContent,
      userID: user._id
    };

    //This is the message that displays after you click the share button
    const msg = "Do you want to share this post?"

  //A dialog box will open up 
  const addDialog = ({ onClose }) => {
    
    //If the user doesn't want to share a status, simply click no and the user will be alerted 
    const handleClickedNo = () => {
      alert('clicked no')
      onClose()
    }

    //If the user clicks yes, the user is alerted that they clicked yes and the post will be shared to their timeline
    const handleClickedYes = async () => {
      alert('clicked yes')
  
      //"/share/:username/:postid/:poster"
      console.log(newPost)
      await axios.post("/share/" + user.username + "/" + postID + "/" + userName, newPost);
      window.location.reload();
      onClose()
    }

    //HTML code for dialog box
    return (
      <div className='add-dialog'>
        <h3>Share Status?</h3>
        <p>{msg}</p>
        <div className="add-dialog-buttons">
        < button onClick={handleClickedNo}>No</button>
        < button onClick={handleClickedYes}>Yes</button>
        </div>
      </div>
    )
  }      

  confirmAlert({ customUI: addDialog })

  }

  //This handles when a user wants to comment on a given post.
  const commentPost = async (e) => {
    e.preventDefault(); 

    //console.log("Comment Route")
    //console.log("Post Being Commented On: " + postContent)
    //console.log("Posts' ID: ", postID)
    //console.log("The content of the comment")
    //console.log("Commenter: ", user.username)

    //This will get the text information by the id (popup2)
    var texts = document.getElementById("popup2");
    console.log("Text: ", texts.value);

    //This creates a newPost object
    const newPost = {
      username: user.username,
      postComment: texts.value,
      userID: user._id
    };

    //console.log(newPost)
    
    //This calls the backend via axios to perform comment 
    await axios.post("/comment/" + user.username + "/" + postID, newPost)
    window.location.reload();
  }

    return (
        <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <img className="postProfileImg" src={user.profilePicture || "assets/photo/noAvatar.jpg"} alt=""/>
                <Link>
                <span className="postUsername"> {post.username || "no username"} </span>
                </Link>
                <span className="postDate"> {format(post.timestamp)} </span>
              </div>
              <div className="postTopRight">
                <button className="postEdit" onClick={editPost}> Update</button>
                <button className="postEdit" onClick={deletePost}> Delete </button>
                <button className="postEdit" onClick={sharePost}> Share </button>
                <input 
                  type="text" 
                  placeholder={"Do you want to share this post?"} 
                  name="vShare" 
                  id="vShare" 
                  class="hide" 
                  ref={timelinePost}> 
                </input>
              </div>
            </div>
              <div className="postCenter">
                  <span className="postText"> {post?.timelinePost} </span>
                  <img className="postImg" src= {PF+post.img} alt=""/>
              </div>
              <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt=""/>
                    <span className="postLikeCounter"> {like} people liked it </span>
                </div>
                <div className="postBottomRight">
                    
                </div>
              </div>
              <div className="postCommentSection">
                <div className="commentSection">
                
              </div>
            </div>

            <div className="commentsBelow">
              <div className="seperateComments">
                <input
                  placeholder={"Make a comment on " + post.username + "'s post?"}
                  className="commentInput"
                  id="popup2" 
                  type="text"
                  minLength="1"
                  ref={timelinePost}
                />
                </div>
                <button className="postComment" onClick={commentPost}>Submit your comment</button>
                <hr className="commentHR"/>
                {comments.map((c) => (
                console.log("Comment ID: ", c._id),
                <Comment key={c._id} unlike={c} />
                ))}
                </div>
                
              </div>
              
      </div>
    );
}
