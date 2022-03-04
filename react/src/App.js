import Home from "./pages/home/homepage";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
