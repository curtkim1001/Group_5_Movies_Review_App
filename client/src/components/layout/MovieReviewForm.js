import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import translateServerErrors from "../../services/translateServerErrors.js";
import ErrorList from "./ErrorList.js";

const MovieReviewForm = ({ movie, movieId }) => {
  const [newReview, setNewReview] = useState({
    content: "",
    rating: "",
    spoilerWarning: false,
  });
  const [errors, setErrors] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const postReview = async (newReviewData) => {
    try {
      const response = await fetch(`/api/v1/movies/${movieId}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newReviewData),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json();
          const newErrors = translateServerErrors(errorBody.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const responseBody = await response.json();
        setErrors([]);
        setRedirect(true);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    if (event.currentTarget.name === "spoilerWarning") {
      if (event.currentTarget.checked) {
        setNewReview({
          ...newReview,
          [event.currentTarget.name]: true,
        });
      } else {
        setNewReview({
          ...newReview,
          [event.currentTarget.name]: false,
        });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postReview(newReview);
    clearForm();
  };

  const clearForm = () => {
    setNewReview({
      content: "",
      rating: "",
      spoilerWarning: false,
    });
  };

  if (redirect) {
    return <Redirect to={{ pathname: `/movies/${movieId}` }} />;
  }

  return (
    <div className="callout">
      <h1>Submit a review for {movie.title}</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label>
          Content:
          <input
            type="text"
            name="content"
            onChange={handleInputChange}
            value={newReview.content}
          />
        </label>

        <label htmlFor="rating">
          Rating:
          <select id="rating" value={newReview.rating} onChange={handleInputChange} name="rating">
            <option value="empty"></option>
            <option value="1">1 reel</option>
            <option value="2">2 reels</option>
            <option value="3">3 reels</option>
            <option value="4">4 reels</option>
            <option value="5">5 reels</option>
          </select>
        </label>

        <label>
          Spoilers in Review
          <input
            type="checkbox"
            name="spoilerWarning"
            value={newReview.spoilerWarning}
            onChange={handleInputChange}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default MovieReviewForm;
