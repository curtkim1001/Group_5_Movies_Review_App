import React, { useState } from "react";
import translateServerErrors from "../../services/translateServerErrors.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const ReviewTile = (props) => {
  const [errors, setErrors] = useState([]);
  const [voteTotal, setVoteTotal] = useState(props.review.voteValue);

  const handleVote = async (voteValue, reviewId) => {
    try {
      const response = await fetch(`/api/v1/votes`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ voteValue, reviewId }),
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
        setErrors(errors);
        setVoteTotal(responseBody.vote);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleUpVote = (reviewId) => {
    handleVote(1, reviewId);
  };

  const handleDownVote = (reviewId) => {
    handleVote(-1, reviewId);
  };

  let message = "";
  if (props.review.spoilerWarning === true) {
    message = "Spoiler Alert!";
  }

  return (
    <div className="callout review-show rounded-corner">
      <p>Username is: {props.review.user.username}</p>
      <div className="spoiler-text">
        <p>{message}</p>
      </div>
      <h4>{props.review.content}</h4>
      <p>Rating: {props.review.rating}</p>
      <p>Total votes: {voteTotal}</p>
      <p onClick={() => handleUpVote(props.review.id)}>
        <FontAwesomeIcon icon={faThumbsUp} />
      </p>
      <p onClick={() => handleDownVote(props.review.id)}>
        <FontAwesomeIcon icon={faThumbsDown} />
      </p>
    </div>
  );
};

export default ReviewTile;
