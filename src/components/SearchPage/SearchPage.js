import { useState, useEffect } from "react";
import "./SearchPage.css";
import MovieCard from "../MovieCard/MovieCard";
import { useParams } from "react-router";
import config from "../../config";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const api_key = config.api_key;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [pageNum, setpageNum] = useState(1);

  const { searchInputValue } = useParams();
  const classes = useStyles();
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
      <Button variant="contained" color="primary" onClick={handleLoad}>Load More</Button>
    </div>
  );
}
