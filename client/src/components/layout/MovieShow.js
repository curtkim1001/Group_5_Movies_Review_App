import React, { useState, useEffect } from "react"
import ReviewList from "./ReviewList"
const MovieShow = (props) => {
    const [movie, setMovie] = useState({
        title: "",
        year: "",
        genre: "",
        synopsis: "",
        movieImageUrl: "",
    })
    const [reviews, setReviews] = useState([])

    const getMovie = async () => {
        const movieId = props.match.params.id
        try {
            const response = await fetch(`/api/v1/movies/${movieId}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const movieData = await response.json()
            setMovie(movieData.movie)
            setReviews(movieData.movie.reviews)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getMovie()
    }, [])

    return (
        <div className="movie-show grid-container grid-x">
            <h2>Movie Show Page</h2>
            <div className="cell small-10 medium-8 large-8 content">
                <h4>{movie.title}</h4>
                <div className="callout movie-content">
                    <p>Release Year :{movie.year}</p>
                    <p>Genre :{movie.genre}</p>
                    <p>Description: {movie.synopsis}</p>
                </div>
                <img src={movie.movieImageUrl} alt="movie-poster"></img>
            </div>
            <ReviewList movieReviews={reviews}/>
        </div>
    )
}

export default MovieShow