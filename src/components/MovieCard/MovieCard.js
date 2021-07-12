import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const poster = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`;
  return (
    <div className="Card">
      <div className="Poster">
        <img src={poster} alt="movie poster" width="200px" />
      </div>
      {/* {movie.title} */}
      <div className="Name">{movie.title}</div>
    </div>
  );
}
