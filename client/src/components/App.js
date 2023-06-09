import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import MovieList from "./layout/MovieList.js";
import WelcomeMessage from "./layout/WelcomeMessage.js";
import MovieShow from "./layout/MovieShow.js";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute.js";
import UserProfile from "./layout/UserProfile.js";
import EditReviewForm from "./layout/EditReviewForm.js"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={WelcomeMessage} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/movies" component={MovieList} />
        {/* <Route exact path="/movies/:id/reviews/:reviewId/edit" component={EditReviewForm} /> */}
        <Route exact path="/movies/:id">
          <MovieShow user={currentUser} />
        </Route>
        <AuthenticatedRoute exact path="/profile" component={UserProfile} user={currentUser} />
        <AuthenticatedRoute exact path="/movies/:id/reviews/:reviewId/edit" component={EditReviewForm} user={currentUser} />
      </Switch>
    </Router>
  );
};

export default hot(App);
