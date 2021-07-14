import "./MovieCard.css";
import { Link } from "react-router-dom"

export default function MovieCard({ movie }) {
  const poster = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`;
  return (
    <div className="Card">
      <div className="Poster">
        <Link to={`movie/${movie.id}`}>
          <img src={poster} alt="movie poster" width="200px" />
        </Link>
      </div>
      <div className="Name">{movie.title}</div>
    </div>
  );
}
