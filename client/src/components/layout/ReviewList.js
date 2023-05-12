import React from "react";

const ReviewList = (props) => {
  const allReviewsArray = props.movieReviews.map((reviews) => {
    let message = "";
    if (reviews.spoilerWarning === true) {
      message = "Spoiler Alert!";
    }
    return (
      <div key={reviews.id} className="callout review-show rounded-corner">
        <p>Reeler: {reviews.user.username}</p>
        <div className="spoiler-text">
          <p>{message}</p>
        </div>
        <h4>{reviews.content}</h4>
        <p>Rating: {reviews.rating}</p>
      </div>
    );
  });

  return <>{allReviewsArray}</>;
};

export default ReviewList;
