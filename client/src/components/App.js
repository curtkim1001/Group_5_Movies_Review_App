import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import three from "../../public/images/DALL·E 2023-05-03 12.11.41 - Three astronauts  watching a movie on a screen on the moon pixel art.png"
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import MovieList from "./layout/MovieList.js"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <div className="background">
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <h2 className="welcome-message">Reel Reviews</h2>
          <h4 className="welcome-message">Take a seat, enjoy the space.</h4>
          <img className="logo" src={three}/>
          <p className="authors">Developed and Designed by: Curt, Jose, and Solomon</p>
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/movies" component={MovieList} />
      </Switch>
    </Router>
    </div>
  );
};

export default hot(App);
