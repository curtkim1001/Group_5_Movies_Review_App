import React, { useState, useEffect } from "react";
import translateServerErrors from "../../services/translateServerErrors.js";
import ErrorList from "./ErrorList.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const ReviewTile = props => {

    const [errors, setErrors] = useState([])
    const [newVote, setNewVote] = useState(0)
    const [voted, setVoted] = useState(false)
    const [voteTotal, setVoteTotal] = useState(props.review.votes)

    let upVotedClassName = ""
    let downVotedClassName = ""
    if (newVote === 1) {
        upVotedClassName = "liked"
    }

    const getVotes = async () => {
        try {
            const response = await fetch(`/api/v1/movies/${props.movieId}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const votesData = await response.json()
            debugger    
            // setVoteTotal(votesData.total)

        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        // if (newVote) {
        getVotes()
        // }
    }, [])

    const handleVotes = async (voteValue, reviewId) => {
        try {
            const response = await fetch(`/api/v1/votes`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ votes: voteValue, reviewId })
            })
            if (!response.ok) {
                if (response.status === 422) {
                    console.log(errorMessage)
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
                setNewVote(responseBody.vote.votes)
                getVotes()
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }


    const handleUpVote = (reviewId) => {
        // if (!voted) {
        // setNewVote(1);
        // setVoted(true);
        // } else {
        //     if (newVote === -1) {
        //         setNewVote(newVote + 2);
        //     } else {
        //         setNewVote(newVote - 1);
        //         setVoted(false);
        //     }
        // }
        // console.log(upVotedClassName)
        handleVotes(1, reviewId)
        // setCurrentReview(reviewId)
    };

    // UPDATE THIS TO MATCH THE UPVOTE
    const handleDownVote = (reviewId) => {
        // if (!voted) {
        //     setNewVote(newVote - 1);
        //     setVoted(true);
        //     downVotedClassName = "icon"
        // } else {
        //     if (newVote === 1) {
        //         setNewVote(newVote - 2);
        //     } else {
        //         setNewVote(newVote + 1);
        //         setVoted(false);
        //     }
        // }
        handleVotes(-1, reviewId)
        // setCurrentReview(reviewId)
    };

    let message = ""
    if (props.review.spoilerWarning === true) {
        message = "Spoiler Alert!"
    }

    return (
        <div className="callout border">
            <p>Username is: {props.review.user.username}</p>
            <h4>{props.review.content}</h4>
            <p>Rating: {props.review.rating}</p>
            <p>Total votes: {voteTotal}</p>
            <div >
                <p onClick={() => handleUpVote(props.review.id)} ><FontAwesomeIcon disabled={voted} icon={faThumbsUp} className={upVotedClassName} /></p>
            </div>
            <p onClick={() => handleDownVote(props.review.id)} ><FontAwesomeIcon disabled={voted} icon={faThumbsDown} className={downVotedClassName} /></p>
            <p>{message}</p>
        </div>
    )
}

export default ReviewTile
