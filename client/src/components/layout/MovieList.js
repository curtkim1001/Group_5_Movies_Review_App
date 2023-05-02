import React, { useEffect, useState } from 'react'

const MovieList = (props) => {
    const [movies, setMovies] = useState([])

    const getMovies = async() => {
        try {
            const response = await fetch(`/api/v1/movies`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const body = await response.json()
            setMovies(body.movies)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getMovies()
    },[])

    const moviesListArray = movies.map((movie)=> {
        return (
            <>
                <li key={movie.id}>
                    {movie.title}
                </li>
                <br></br>
                <p>
                    Release Year: {movie.year} 
                </p>
                <p>
                    Genre: {movie.genre} 
                </p>
                <img src={movie.movieImageUrl} alt="movie-posters" width="200" height="200"></img>
                <hr></hr>
            </>
        )
    })

    return (
        <>
            <h1>All Movies</h1>
            <ul>
                {moviesListArray}
            </ul>
        </>
    )
}

export default MovieList