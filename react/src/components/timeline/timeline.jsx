import "./timeline.css"
import Share from "../share/share"
import Post from "../post/post"
import { useContext, useState, useEffect } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = user.username
        ? await axios.get("/profile/" + user.username)
        : await axios.get("/timeline/" + user._id);
      setPosts(
        res.data.reverse(posts.timestamp)
      );
    };
    fetchPosts();
  }, [user.username, user._id]);

  return (
    <div className = "timeline">
        <div className ="timelineWrapper">
            <Share />
            {posts.map((p) => (
              <Post key={p._id} post={p} />
            ))}
        </div>
    </div>
  )
}

{/*
  
*/}
