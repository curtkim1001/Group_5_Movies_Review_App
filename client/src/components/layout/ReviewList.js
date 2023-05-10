import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import translateServerErrors from "../../services/translateServerErrors";
import ReviewTile from "./ReviewTile.js"

const ReviewList = (props) => {
    const allReviewsArray = props.movieReviews.map(review => {
        return (
            <div key={review.id}>
                <ReviewTile  review={review} />
            </div>
        )
    })

    return <>{allReviewsArray}</>;
};

export default ReviewList;
