import "./post.css"
import { ControlPointDuplicateTwoTone, MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext, useRef } from "react"
import axios from 'axios'
import {format} from 'timeago.js'
import { Link, NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function Post({post}) {
  
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const timelinePost = useRef(); 

  const userID = post.userID; 
  const userName = post.username;
  const postID = post._id; 

  console.log("Post User ID: ", post.userID)

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  //Calling this function will delete a post
  const deletePost = async (e) => {
    e.preventDefault(); 
    if (userID === user._id){
      //Specifically calls the delete function from the API here
      await axios.delete("/" + postID)
      window.location.reload();
    }
    else {
      console.log("Cannot delete post that are not yours")
    }
    
  } 

  //This opens or hides the update box when the user clicks "edit"
  function openBox (){
    var text = document.getElementById("popup");
    console.log("Text: ", text.value);
    var button = document.getElementById("popupButton")
    text.classList.toggle("hide");
    button.classList.toggle("hide");
    text.classList.toggle("show");
    button.classList.toggle("show");
  }

  //Edit post will delete the current status, and create a new one 
  const editPost = async (e) => {
    e.preventDefault();

    console.log("Post ID: ", postID)
    var texts = document.getElementById("popup");
    console.log("Text: ", texts.value);
    console.log("User ID: ", userID);

    const newPost = {
      username: post.username,
      timelinePost: texts.value,
    };

    console.log("NEW POST: ", newPost)
    
    try {
      //First delete the current post and reload the page
      await axios.delete("/" + postID)
      window.location.reload();
      //Then set the post in the update box to be a new post
      await axios.post("/status/" + userID, newPost);
      window.location.reload();
    } catch (err) {}

  }

  const sharePost = async (e) => {
    e.preventDefault();
    console.log("SHARED POST FROM: ", userName)
  }

  const commentPost = async (e) => {
    e.preventDefault(); 
    console.log("Comment Route")
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
                <button className="postEdit" onClick={openBox}> Edit </button>
                <input 
                  type="text" 
                  placeholder={"Update post, " + user.username + "?"} 
                  name="popup" 
                  id="popup" 
                  class="hide" 
                  ref={timelinePost}> 
                </input>
                <button className="postEdit" id="popupButton" class="hide" onClick={editPost}>Update</button>
                <button className="postEdit" onClick={deletePost}> Delete </button>
                <button className="postEdit" onClick={sharePost}> Share </button>
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
                    <span className="postCommentText">{post.comment} comments </span>
                </div>
              </div>
            </div>
        </div>
    );
}
