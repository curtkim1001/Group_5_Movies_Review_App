import React from "react"

const ReviewList = (props) => {

    const allReviewsArray = props.movieReviews.map(reviews =>{
        let message = ""
        if(reviews.spoilerWarning === true){
            message = "Spoiler Alert!"
        }
        return (
            <div key={reviews.id} className="callout">
                <p>Username is: {reviews.user.username}</p>
                <h4>{reviews.content}</h4>
                <p>Rating: {reviews.rating}</p>
                <p>{message}</p>
            </div>
        )
    })

  return <>{allReviewsArray}</>;
};

export default ReviewList;
