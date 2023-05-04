import local from "passport-local";

import User from "../models/User.js";

const authHandler = (email, password, done) => {
  User.query()
    .findOne({ email })
    .then((user) => {
      if (user) {
        console.log(password)
        if (user.authenticate(password)) {
          console.log("auth successful")
          return done(null, user);
        }

        return done(null, false, { message: "Invalid credentials" });
      }
      return done(null, false, { message: "Invalid credentials" });
    });
};

export default new local.Strategy({ usernameField: "email" }, authHandler);
