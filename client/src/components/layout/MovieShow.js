import React, { useState, useEffect } from "react";
import ReviewList from "./ReviewList.js";
import MovieReviewForm from "./MovieReviewForm.js";
import { useParams } from "react-router-dom";

const MovieShow = (props) => {
    let visibleReviewFormComponent;
    const { id } = useParams();

    const [movie, setMovie] = useState({
        title: "",
        year: "",
        genre: "",
        synopsis: "",
        movieImageUrl: "",
    });
    const [reviews, setReviews] = useState([]);

    const getMovie = async () => {
        try {
            const response = await fetch(`/api/v1/movies/${id}`);
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw error;
            }
            const movieData = await response.json();
            setMovie(movieData.movie);
            setReviews(movieData.movie.reviews);
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };

    const getAverageRating = () => {
        let total = 0
        let average = 0
        reviews.forEach((review) => {
            total += review.rating
        })
        average = total / (reviews.length)
        return average.toFixed(2)
    }

    useEffect(() => {
        getMovie()
    }, [])

    if (props.user) {
        visibleReviewFormComponent = <MovieReviewForm
            movie={movie}
            movieId={id}
            reviews={reviews}
            setReviews={setReviews}
        />
    } else {
        visibleReviewFormComponent = null
    }

    return (
        <div className="movie-show grid-container grid-x">
            <h2>{movie.title}</h2>
            <div className="cell small-10 medium-8 large-8 content">
                <div className="callout movie-content rounded-corner">
                    <p>Release Year: {movie.year}</p>
                    <p>Genre: {movie.genre}</p>
                    <p>Description: {movie.synopsis}</p>
                    <p>Average Rating: {getAverageRating()}</p>
                </div>
                <img src={movie.movieImageUrl} alt="movie-poster"></img>
            </div>
            <ReviewList movieReviews={reviews} movieId={id} user={props.user} />
            <div className="review-form">{visibleReviewFormComponent}</div>
        </div>
    );
};

export default MovieShow;
