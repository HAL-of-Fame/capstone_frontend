import "./MovieCard.css";
import { Link } from "react-router-dom";
// import { Prop } from "react";
// import { Redirect } from "react";

export default function MovieCard({ movie }) {
  const poster = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`;
  return (
    <div className="Card">
      <span className="Poster">
        <Link to={`/movie/${movie.id}`}>
          <img src={poster} alt="movie poster" width="200px" />
        </Link>
      </span>
      <div className="Name">{movie.title}</div>
    </div>
  );
}

/* <Link to={location => ({ ...location, pathname: "/courses" })} /> */
