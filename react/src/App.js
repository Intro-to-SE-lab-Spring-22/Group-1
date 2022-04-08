import Home from "./pages/home/homepage";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import EditAccount from "./pages/editAccount/EditAccount";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./context/authContext";
import EditUsername from "./pages/editUsername/EditUsername";
import EditEmail from "./pages/editEmail/EditEmail";
import EditPassword from "./pages/editPassword/EditPassword";

function App() {

  //This gets the user
  const {user} = useContext(AuthContext);

  //Below are the different site pages for our platform

  return (
    <Router>
      <Switch>
      <Route exact path="/">
            {user ? <Home /> : <Login/>} 
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/"/> : <Login />}
          </Route>
          <Route path="/register">
          {user ? <Redirect to="/"/> : <Register />}
          </Route>
          <Route path="/logout">
            <Redirect to="/"/> : <Login />
          </Route>
          <Route path="/editAccount">
            <EditAccount />
          </Route>
          <Route path="/editUsername">
            <EditUsername />
          </Route>
          <Route path="/editEmail">
            <EditEmail />
          </Route>
          <Route path="/editPassword">
            <EditPassword />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
