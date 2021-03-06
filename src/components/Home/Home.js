import { useEffect, useState } from "react";
import "./Home.css";
import MovieCard from "../MovieCard/MovieCard";
import config from "../../config";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const api_key = config.api_key;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
export default function Home({ user }) {
  //   const [name, setName] = useState([]);
  const [trending, setTrending] = useState([]);
  const [pageNum, setpageNum] = useState(1);
  const classes = useStyles();
  useEffect(() => {
    //function that calls all popular movies
    const fetchTrending = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=` +
          api_key +
          `&language=en-US&page=${pageNum}`
      );
      const responseData = await data.json();
      if (responseData) {
        if (pageNum > 1) {
          addMovies(responseData.results);
        } else {
          setTrending(responseData.results);
        }
      }
    };
    fetchTrending();
  }, [pageNum]);
  const addMovies = (newMovies) => {
    setTrending((oldMovies) => [...oldMovies, ...newMovies]);
  };

  const handleLoad = (event) => {
    setpageNum((pageNum) => pageNum + 1);
  };
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
      {/* <button> */}
      <div className="trending">
        {trending?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
      {/* </button> */}
      <Button variant="contained" color="primary" onClick={handleLoad}>
        Load More
      </Button>
    </div>
  );
}
