import React from "react"

const MovieTile = ( { movie }) => {

    return ( 
        <div className="grid-x grid-margin-x callout border">
        <div className="cell small-3">
            <img className="movie-poster" src={movie.movieImageUrl} alt="movie-posters"></img>
        </div>
        <div className="cell small-9 border">
            <h4><strong>{movie.title}</strong></h4>
            <p>Release Year: {movie.year}</p>
            <p>Genre: {movie.genre}</p>
        </div>
    </div>
    )
}

export default MovieTile