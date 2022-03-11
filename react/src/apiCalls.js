import axios from "axios"

export const loginCall = async (userCredentials, dispatch)=> {
    dispatch({type:"LOGIN_START"})
    try{
        const res = await axios.post("/login", userCredentials);
        dispatch({type:"LOGIN_SUCCESS", payload: res.data})
    }catch(err){
        dispatch({type:"LOGIN_FAILURE", payload: err})
    }
}

export const logoutCall = async (userCredentials, dispatch)=> {
    const res = await axios.post("/logout", userCredentials);
    dispatch({type:"LOGOUT"})
}

export const deleteAcct = async (userCredentials, dispatch)=> {
    const res = await axios.delete("/delete", userCredentials);
    dispatch({type:"DELETE_ACCOUNT", payload: res.send("User Deleted")})
}
    