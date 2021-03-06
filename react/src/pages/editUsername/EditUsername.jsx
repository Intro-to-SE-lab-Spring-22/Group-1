import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './EditUsername.css'

export default function EditUsername() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const username = useRef();
    const history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();

        //Get the current user's username
        const currentUser = user.username;

        //Get the new username from the referenced username 
        const updateUser = {
          username: username.current.value
        };

        //console.log("updateUser: ", updateUser)

        //Update the name and refresh to login name
        try {
          const res = await axios.put('/updateName/' + currentUser, updateUser);
          console.log(res.data)
          window.localStorage.clear();
          window.location.href = "/login"
        } catch (err) {}
    };

    return (
        <div className="EditU">
          <div className="EditUWrapper">
            <div className="EditULeft">
              <h3 className="EditULogo">Update Username</h3>
              <span className="EditUDesc">
                Update username and submit! After update, you will have to log in again.
              </span>
            </div>
            <div className="EditURight">
              <form className="EditUBox" onSubmit={submitHandler}>
                <input
                  placeholder="Username"
                  data-testid="username-input"
                  required
                  ref={username}
                  className="EditUInput"
                />
                <button className="EditUButton" type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      );
}
