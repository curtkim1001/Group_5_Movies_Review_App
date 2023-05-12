import React, { useEffect, useState } from "react"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "../layout/ErrorList.js"
import { Redirect } from "react-router-dom"
import { useParams } from "react-router-dom";

const EditReviewForm = props => {

    const movieId = (useParams()).id
    const reviewId = (useParams()).reviewId

    const blankReview = {
        content: "",
        rating: "",
        spoilerWarning: false
      }
    
    const [edittedReview, setEdittedReview] = useState(blankReview)
    const [errors, setErrors] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const getExistingReview = async (reviewId) => {
        try {
            const response = await fetch(`/api/v1/movies/${movieId}/reviews/${reviewId}`)
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setEdittedReview(body.review)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getExistingReview(reviewId)
    }, [])

    const patchEdittedReview = async () => {
        try {
            const response = await fetch(`/api/v1/movies/${movieId}/reviews/${reviewId}/edit`, {
                method: "PATCH",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify( {review: edittedReview} )
            })
            if (!response.ok) {
                if (response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = await response.json()
                    throw new Error(errorMessage)
                }
            } else {
                setShouldRedirect(true)
            }
        } catch(err) {
            console.error("Error in fetch", err.message)
        }
    }
    
    const handleInputChange = (event) => {
        setEdittedReview({
          ...edittedReview,
          [event.currentTarget.name]: event.currentTarget.value,
        });
        if (event.currentTarget.name === "spoilerWarning") {
          if (event.currentTarget.checked) {
            setEdittedReview({
              ...edittedReview,
              [event.currentTarget.name]: true,
            });
          } else {
            setEdittedReview({
              ...edittedReview,
              [event.currentTarget.name]: false,
            });
          }
        }
      };

    const handleSubmit = event => {
        event.preventDefault()
        patchEdittedReview()
    }

    if(shouldRedirect) {
        return <Redirect push to={`/movies/${movieId}`} />
    }

    return (
        <div className="callout">
            <h1>Edit Movie Review</h1>
        <ErrorList errors={errors} />
        <form onSubmit={handleSubmit}>
        <label>
          Content:
          <input
            className="review-text-box rounded-corner"
            type="text"
            name="content"
            onChange={handleInputChange}
            value={edittedReview.content}
          />
        </label>

        <label htmlFor="rating">
          Rating:
          <select
            className="rating-box"
            id="rating"
            value={edittedReview.rating}
            onChange={handleInputChange}
            name="rating"
          >
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
            className="spoiler-box"
            type="checkbox"
            name="spoilerWarning"
            value={edittedReview.spoilerWarning}
            onChange={handleInputChange}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
        </div>
    )
}
export default EditReviewForm