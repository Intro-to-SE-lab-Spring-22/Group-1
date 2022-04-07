import React from 'react'
import { useState, useEffect, useContext, useRef } from "react"
import axios from 'axios'
import {format} from 'timeago.js'
import { Link, NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function Comment({unlike}) {
  const [comments, setComments] = useState([]);
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  console.log("COMMENT-UNLIKE: ", unlike)
  console.log("UNLIKE-Comment? ", unlike.postComment)

  return (
    <div className="comment">
        <div className="commentWrapper">
            <div className="commentTop">
                {unlike.postComment}
            </div>
        </div>
    </div>
  )
}
