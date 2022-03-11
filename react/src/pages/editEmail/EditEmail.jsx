import './EditEmail.css'
import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

export default function EditEmail() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const email = useRef();
    const history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        const currentUser = user.email;
        const updateUser = {
          email: email.current.value
        };
        console.log("updateUser: ", updateUser)
        try {
          const res = await axios.put('/updateEmail/' + currentUser, updateUser);
          console.log(res.data)
          window.localStorage.clear();
          window.location.href = "/login"
        } catch (err) {}
    };

    return (
        <div className="EditU">
          <div className="EditUWrapper">
            <div className="EditULeft">
              <h3 className="EditULogo">Update Email</h3>
              <span className="EditUDesc">
                Update email and submit! After update, you will have to log in again.
              </span>
            </div>
            <div className="EditURight">
              <form className="EditUBox" onSubmit={submitHandler}>
                <input
                  placeholder="Email"
                  required
                  ref={email}
                  type="email"
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
