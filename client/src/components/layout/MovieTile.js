import React from "react";
import { Redirect, Link } from "react-router-dom";

const MovieTile = ({ movie }) => {
  return (
    <>
      <Link to={`/movies/${movie.id}`}>
        <div className="grid-x grid-margin-x callout border rounded-corner">
          <div className="cell medium-3">
            <img className="movie-poster" src={movie.movieImageUrl} alt="movie-posters"></img>
          </div>
          <div className="medium-9">
            <h4>
              <strong>{movie.title}</strong>
            </h4>
            <p>Release Year: {movie.year}</p>
            <p>Genre: {movie.genre}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MovieTile;
