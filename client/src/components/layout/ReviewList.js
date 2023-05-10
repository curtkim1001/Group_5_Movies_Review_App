import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import translateServerErrors from "../../services/translateServerErrors";

const ReviewList = (props) => {
    const [errors, setErrors] = useState([])
    const [newVote, setNewVote] = useState(0)
    const [voted, setVoted] = useState(false)

    const handleVotes = async (voteValue) => {
        try {
            const response = await fetch(`/api/v1/reviews`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(voteValue)
            })
            if (!response.ok) {
                if (response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                    throw error
                }
            } else {
                const responseBody = await response.json()
                setErrors(errors)
                setNewVote({ ...newVote, vote: newVote })
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }


    const handleUpVote = () => {
        if (!voted) {
            setNewVote(newVote + 1);
            setVoted(true);
        } else {
            if (newVote === -1) {
                setNewVote(newVote + 2);
            } else {
                setNewVote(newVote - 1);
                setVoted(false);
            }
        }
        handleVotes(newVote)
    };

    const handleDownVote = () => {
        if (!voted) {
            setNewVote(newVote - 1);
            setVoted(true);
        } else {
            if (newVote === 1) {
                setNewVote(newVote - 2);
            } else {
                setNewVote(newVote + 1);
                setVoted(false);
            }
        }
        handleVotes(newVote)
    };


    const allReviewsArray = props.movieReviews.map(reviews => {
        let message = ""
        if (reviews.spoilerWarning === true) {
            message = "Spoiler Alert!"
        }
        return (
            <div key={reviews.id} className="callout">
                <p>Username is: {reviews.user.username}</p>
                <h4>{reviews.content}</h4>
                <p>Rating: {reviews.rating}</p>
                <p>Total votes: {newVote}</p>
                <p onClick={handleUpVote} ><FontAwesomeIcon disabled={voted} icon={faThumbsUp} /></p>
                <p onClick={handleDownVote} ><FontAwesomeIcon disabled={voted} icon={faThumbsDown} /></p>
                <p>{message}</p>

            </div>
        )
    })

    return <>{allReviewsArray}</>;
};

export default ReviewList;
