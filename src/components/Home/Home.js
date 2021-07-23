import { useEffect, useState } from "react";
import "./Home.css";
import MovieCard from "../MovieCard/MovieCard";

const api_key = "765ece2c111fb5c30abfeb28d365ac2c";

export default function Home({ user, trending, setTrending }) {
  //   const [name, setName] = useState([]);

  useEffect(() => {
    //function that calls all popular movies
    const fetchTrending = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=` +
          api_key +
          `&language=en-US&page=1`
      );
      const responseData = await data.json();
      if (responseData) {
        setTrending(responseData.results);
      }
    };
    fetchTrending();
  }, []);
  console.log(trending);
  return (
    <div className="Home">
      <div className="Hero">
        {/* hero image */}
        <img
          src="https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1510&q=80"
          alt="Movie Seat Hero"
        />
      </div>

      <div className="title">Trending Movies</div>
      <div className="trending">
        {trending?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
