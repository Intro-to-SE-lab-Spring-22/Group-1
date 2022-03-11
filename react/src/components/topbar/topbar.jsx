import "./topbar.css"
import {Search, Person, Chat, Notifications} from "@material-ui/icons"
import { Link, NavLink, useHistory } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { deleteAcct } from "../../apiCalls";
import axios from "axios";
import { useParams } from "react-router-dom"

export default function Topbar(){

    const email = useRef();
    const {user, dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const history = useHistory();

    const [users, setUser] = useState({});


    //const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogout = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        window.location.href = "/login"
    }
    
    const deleteAcct = async (e) => {
        e.preventDefault();
        try {
            let currentUser = localStorage.getItem('currentUserEmail')
            const work = await axios.delete('/delete/' + currentUser);
            window.localStorage.clear();
            window.location.href = "/login"
        } catch (err){
            console.log(err);
        }
    }

    const editAcct = async (e) => {
        e.preventDefault();
        history.push('/editAccount');
    }

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo"> Group 1 Social</span>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/> 
                        <input placeholder="Search for friends" 
                        className="searchInput"/>

                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <div class="dropdown_div">
                        <button class="dropdown_button">User Options</button>
                            <div class="dropdown_content">
                                <li> <NavLink to="/login" onClick={handleLogout}> Logout </NavLink> </li>
                                <li> <NavLink to="/login" onClick={deleteAcct}> Delete Account </NavLink> </li>
                                <li> <NavLink to="/editAccount" onClick={editAcct}> Edit Account </NavLink> </li>
                            </div>
                    </div>     
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link>
                <img 
                src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : "/assets/photo/noAvatar.jpg"
                    } 
                    alt=""
                    className="topbarImg"/>
                </Link>
            </div>
        </div>
    );
}