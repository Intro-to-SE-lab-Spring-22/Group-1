import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './EditAccount.css'

export default function EditAccount() {

    const history = useHistory(); 

    //Start Functions

    //Go to the edit username page
    const editUsername = async (e) => {
        e.preventDefault();
        history.push('/editUsername');
    }

    //Go to the edit password page
    const editPassword = async (e) => {
        e.preventDefault();
        history.push('/editPassword');
    }

    //Go to the edit email page
    const editEmail = async (e) => {
        e.preventDefault();
        history.push('/editEmail');
    }

    //Go back to the homepage
    const backToHome = async (e) => {
        e.preventDefault();
        history.push('/');
    }

    return (
        <div className="login">
          <div className="loginWrapper">
            <div className="loginLeft">
              <h3 className="loginLogo">Update Information</h3>
              <span className="loginDesc">
                Please click the information field you would like to update.
              </span>
            </div>
            <div className="loginRight">
              <div className="loginBox">
                <button className="loginButton" onClick={editUsername}>
                    Update Username
                </button>
                <button className="loginButton" onClick={editEmail}>
                    Update Email
                </button>
                <button className="loginButton" onClick={editPassword}>
                    Update Password
                </button>
                <button className="loginButton" onClick={backToHome}>
                  Back To Homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}
