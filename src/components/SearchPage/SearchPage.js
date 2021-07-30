import { useState, useEffect } from "react";
import "./SearchPage.css";
import MovieCard from "../MovieCard/MovieCard";
import { useParams } from "react-router";

const api_key = "765ece2c111fb5c30abfeb28d365ac2c";

export default function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [pageNum, setpageNum] = useState(1);

  const { searchInputValue } = useParams();

  useEffect(() => {
    //function that calls all popular movies
    const fetchSearched = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchInputValue}&page=${pageNum}&include_adult=false`
      );
      const responseData = await data.json();
      if (responseData) {
        if (pageNum > 1) {
          addMovies(responseData.results);
        } else {
          setMovies(responseData.results);
        }
      }
    };
    fetchSearched();
  }, [pageNum]);

  const addMovies = (newMovies) => {
    setMovies((oldMovies) => [...oldMovies, ...newMovies]);
  };

  const handleLoad = (event) => {
    setpageNum((pageNum) => pageNum + 1);
  };
  return (
    <div className="SearchPage">
      <div className="title">"{searchInputValue}" Movies</div>
      <div className="searched">
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
      <button className="load" onClick={handleLoad}>
        Load More
      </button>
    </div>
  );
}
