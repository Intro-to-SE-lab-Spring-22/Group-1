import './EditPassword.css'
import axios from 'axios';
import { useContext, useRef } from 'react'
import { AuthContext } from '../../context/authContext';

export default function EditPassword() {

    const { user } = useContext(AuthContext);
    const password = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();

        //Get the current users ID 
        const currentUser = user._id;

        //Get the current value in the referenced password text box
        const updateUser = password.current.value
        //console.log("currentUser: ", currentUser)
        //console.log("updateUser: ", updateUser)

        //If the referenced password length meets the minimum length, the update the password and go back to login page
        if (updateUser.length > 5){
            try {
                const res = await axios.post('/updatePWD/' + currentUser + '/' + updateUser);
                console.log(res.data)
                window.localStorage.clear();
                window.location.href = "/login"
              } catch (err) {}
        }

    };

    return (
        <div className="EditP">
          <div className="EditPWrapper">
            <div className="EditPLeft">
              <h3 className="EditPLogo">Update Password</h3>
              <span className="EditPDesc">
                Update password and submit! After update, you will have to log in again.
              </span>
            </div>
            <div className="EditPRight">
              <form className="EditPBox" onSubmit={submitHandler}>
                <input
                  placeholder="New Password"
                  required
                  ref={password}
                  type="password"
                  min="6"
                  className="EditPInput"
                />
                <button className="EditPButton" type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      );
}

