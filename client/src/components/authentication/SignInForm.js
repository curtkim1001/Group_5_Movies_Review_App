import React, { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = (payload) => {
    setErrors({});
    const { email, password } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    return false;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
        if (Object.keys(errors).length === 0) {
          const response = await fetch("/api/v1/user-sessions", {
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
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="grid-container welcome-message cool" onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <form>
        <div className="grid-x">
          <div className="center small-4">
            <label className="welcome-message">
              Email
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={userPayload.email}
                onChange={onInputChange}
              />
              <FormError error={errors.email} />
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

        <div>
          <input type="submit" className="button" value="Sign In" />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
