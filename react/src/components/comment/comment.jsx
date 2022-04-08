import React from 'react'
import { useState, useEffect, useContext, useRef } from "react"
import axios from 'axios'
import {format} from 'timeago.js'
import { Link, NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext";


//The program will not work with comment being passed so I used a random name (unlike)
export default function Comment({unlike}) {
  const [comments, setComments] = useState([]);
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="comment">
        <div className="commentWrapper">
            <span className="Test"> </span>
            <div className="commentTop">
                <div className="commentUser">
                    <span className="userComment"> {unlike.username} commented: {unlike.postComment}</span>
                </div>
            </div>
        </div>
    </div>
  )
}
