import React from "react"
import MovieShow from "./MovieShow"

const ReviewList = (props) => {
    const allReviewsArray = props.movieReviews.map(reviews =>{
        let message = ""
        if(reviews.spoilerWarning === true){
            message = "Spoiler Alert!"
        }
        return (
            <div className="callout">
                <h2> 
                    {reviews.content}
                </h2>
                <p>
                    {reviews.rating}
                </p>
                <p>
                    {message}
                </p>
            </div>
        )
    })
    return (
        <>
        {allReviewsArray}
        </>
    )
}

export default ReviewList