import React from "react"
import '../../assets/scss/styles.scss'

const MovieTile = ( { movie }) => {

    return (
        <div className="grid-container"> 
            <div className="grid-x grid-margin-x callout primary">
                <div className="text-right cell">
                    <li key={movie.id} >
                        {movie.title}
                    </li>
                </div>
                <p className="text-right cell">
                    Release Year: {movie.year} 
                </p>
                <p className="text-right cell">
                    Genre: {movie.genre} 
                </p>
                <div className="cell small-6">
                    <img className="movie-poster" src={movie.movieImageUrl} alt="movie-posters"></img>
                </div>
            </div>
        </div>
    )
}

export default MovieTile