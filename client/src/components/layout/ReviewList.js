import React from "react";
import MovieShow from "./MovieShow";

const ReviewList = (props) => {
  const allReviewsArray = props.movieReviews.map((reviews) => {
    let message = "";
    if (reviews.spoilerWarning === true) {
      message = "Spoiler Alert!";
    }
    return (
      <div className="grid-container">
        <div key={reviews.id} className="callout">
          <h2>{reviews.content}</h2>
          <p>{reviews.rating}</p>
          <p> {message}</p>
        </div>
      </div>
    );
  });
  return <>{allReviewsArray}</>;
};

export default ReviewList;
