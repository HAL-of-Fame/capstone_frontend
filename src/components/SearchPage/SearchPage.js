import { useState, useEffect } from "react";
import "./SearchPage.css";
import MovieCard from "../MovieCard/MovieCard";
import { useParams } from "react-router";

const api_key = "765ece2c111fb5c30abfeb28d365ac2c";

export default function SearchPage() {
  const [movies, setMovies] = useState([]);

  const { searchInputValue } = useParams();

  useEffect(() => {
    //function that calls all popular movies
    const fetchSearched = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchInputValue}&page=1`
      );
      console.log(data);
      const responseData = await data.json();
      if (responseData) {
        setMovies(responseData.results);
      }
    };
    fetchSearched();
  }, []);
  return (
    <div className="Search Page">
      <div className="title">"{searchInputValue}" Movies</div>
      <div className="searched">
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
          //   <Link to="/" >
        ))}
      </div>
    </div>
  );

  //ideas:
  //pass the search input to the teh SearchPage function
  //use the input into the api call
  //setMovies to the data from the api
  //call map over the list and call MovieCard on each item
}
