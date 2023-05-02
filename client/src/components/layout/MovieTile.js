import React from "react"

const MovieTile = ( { movie }) => {

    return ( 
            <div className="grid-x grid-margin-x callout primary">
                <div className="text-right cell">
                    <p key={movie.id} >
                        {movie.title}
                    </p>
                </div>
                <p className="text-right cell">
                    Release Years: {movie.year} 
                </p>
                <p className="text-right cell">
                    Genre: {movie.genre} 
                </p>
                <div className="cell small-6">
                    <img className="movie-poster" src={movie.movieImageUrl} alt="movie-posters"></img>
                </div>
            </div>
    )
}

export default MovieTile