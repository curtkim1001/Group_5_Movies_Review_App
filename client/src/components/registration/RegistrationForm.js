import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    username: "",
    admin: false
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation, username, admin } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};

    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (username.trim() == "") {
      newErrors = {
        ...newErrors,
        username: "is required"
      }
    }

    if (username.length < 5) {
      newErrors = {
        ...newErrors,
        username: "must be at least 5 characters long"
      }
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
        if (Object.keys(errors).length === 0) {
          const response = await fetch("/api/v1/users", {
            method: "post",
            body: JSON.stringify(userPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          });
          if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
          }
          const userData = await response.json();
          setShouldRedirect(true);
        }
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    if (event.currentTarget.name === "admin") {
      if (event.currentTarget.checked) {
        setUserPayload({
          ...userPayload,
          [event.currentTarget.name]: true
        });
      }
      else {
        setUserPayload({
          ...userPayload,
          [event.currentTarget.name]: false,
        });
      }
    }
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (

    <div className="grid-container welcome-message cool">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div className="grid-x">
          <div className="center small-4">

          <label className="welcome-message">
            Email
            <input type="text" name="email" placeholder="Email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
          </div>
        </div>

        <div className="grid-x">
          <div className="center small-4">

          <label className="welcome-message">
            Username
            <input type="text" name="username" placeholder="username or user ID" value={userPayload.username} onChange={onInputChange} />
            <FormError error={errors.username} />
          </label>
          </div>
        </div>

        <div className="grid-x">
          <div className="center small-4">
          <label className="welcome-message">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
          </div>
        </div>

        <div className="grid-x">
          <div className="center small-4">

          <label className="welcome-message">
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              placeholder="Confirmed Password"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
          </div>
        </div>

        <div className="grid-x">
          <div className="center small-4">

          <label className="welcome-message">
            Administrator
            <input
              type="checkbox"
              name="admin"
              value={userPayload.admin}
              onChange={onInputChange}
            />
          </label>
          </div>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;