import React, { useEffect, useState } from 'react'
import MovieTile from "./MovieTile.js"

const MovieList = (props) => {
    const [movies, setMovies] = useState([])

    const getMovies = async() => {
        try {
            const response = await fetch("/api/v1/movies")
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
            <MovieTile movie={movie} key={movie.id}/>
        )
    })

    return (
        <>
            <h1>All Movies</h1>
            <div>
                {moviesListArray}
            </div>
        </>
    )
}

export default MovieList