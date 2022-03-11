import "./post.css"
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect } from "react"
import axios from 'axios'
import {format} from 'timeago.js'
import { Link } from "react-router-dom";

export default function Post({post}) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const userID = post.userID; 
  const userName = post.username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('/username/' + userName);
      console.log(res.data);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userID]);

  console.log("Post User ID: ", post.userID)

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

    return (
        <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <img className="postProfileImg" src={user.profilePicture || "assets/photo/noAvatar.jpg"} alt=""/>
                <Link>
                <span className="postUsername"> {user.username || "no username"} </span>
                </Link>
                <span className="postDate"> {format(post.timestamp)} </span>
              </div>
              <div className="postTopRight">
                <MoreVert />
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
