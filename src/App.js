import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import MovieDetails from "./Home/Row/MovieDetails/MovieDetails";
import Nav from "./Home/Nav/Nav";
import { useStateValue } from "./reducers/StateProvider";
function App() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  return (
    <Router>
      <div className="app">
        {!user ? (
          <Login />
        ) : (
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/movieDetail/:mid">
              <Nav /> <MovieDetails />
            </Route>
            <Route exact path="/">
              <Nav /> <Home />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
