import "./topbar.css"
import {Search, Person, Chat, Notifications} from "@material-ui/icons"
import { Link, NavLink, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

export default function Topbar(){

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const history = useHistory();

    //const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogout = (e) => {
        e.preventDefault();
        history.go(0);
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
                    <li>
                        <NavLink to="/login" onClick={handleLogout}> Logout </NavLink>
                    </li>
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