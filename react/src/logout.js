import React, { Component } from "react";
import {Link} from "react-router-dom"

export default class Nav extends Component{

    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);
    };

    render() {
        let buttons;

        if(this.props.user){
            buttons = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to {'/login'} onClick={this.handleLogout} className="nav-link">Logout</Link>
                    </li>
                </ul>
            )
        }
    }
}