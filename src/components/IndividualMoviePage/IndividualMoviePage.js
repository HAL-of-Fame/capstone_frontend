import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Router } from "react-router"
import "./IndividualMoviePage.css";
import Popup from "../Popup/Popup";
import "../../components/Popup/Popup.css";
// import axios from "axios";
import MoviePost from "../MoviePostForm/MoviePostForm";

// const api_key = "765ece2c111fb5c30abfeb28d365ac2c";
const api_key = "d8e8e9a8ed16ae9fd3ea37274ab553aa";

export default function IndividualMoviePage(props) {
  const { onAdd, genre, setGenre, movieName, setMovieName } = props;
  const [individual, setIndividual] = useState([]);
  const [video, setVideo] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // const [genre, setGenre] = useState("");
  // const [movieName, setMovieName] = useState("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // will strip the movie_id from the URL (holds movie ID)
  const { movie_id } = useParams();

  useEffect(() => {
    const fetchIndividual = async () => {
      // console.log("inside fetchIndividual");
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/` +
          movie_id +
          `?api_key=` +
          api_key +
          `&language=en-US`
      );
      const responseData = await data.json();
      if (responseData) {
        setIndividual(responseData);
        // console.log("done with fetchIndividual");
      }
      // console.log(responseData.genres);
    };

    const fetchVideo = async () => {
      // console.log("inside fetchVideo");
      const viddata = await fetch(
        `https://api.themoviedb.org/3/movie/` +
          movie_id +
          `/videos?api_key=` +
          api_key +
          `&language=en-US`
      );
      const responseVidData = await viddata.json();
      // console.log(responseVidData);
      if (responseVidData) {
        setVideo(responseVidData.results[0].key);
        // console.log("done fetchVideo");
      }
    };

    fetchIndividual();
    fetchVideo();
  }, []);


  useEffect(() => {
    // console.log('individual', individual)
    // console.log("inside setGenre - individual", individual);
    const setGenreMovieName = async () => {
      const genreOptions = [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Family",
        "Fantasy",
        "Romance",
        "Drama",
        "Science-fiction",
        "Horror",
        "Thriller",
      ];
      // console.log('genre', genre)
      // const genres = individual.genres;
      const movieName = individual.original_title;
      setMovieName(movieName);
      // console.log("movieName", movieName);
      // console.log("genres", individual.genres);
      if (individual?.genres?.length > 0) {
        // console.log(individual.genres)
        individual.genres.map((genreobj) => {
          if (genreOptions.includes(genreobj.name) === true) {
            const genre = genreobj.name;
            setGenre(genre);
          }
        });
      }
      // console.log('genres', genres)
      // console.log('movieName', movieName)
    };
    setGenreMovieName();
  }, [individual, video]);

  // console.log("individual", individual);

  // setGenre();
  // console.log("outside of useeffect");
  // console.log(video)
  const poster = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${individual.backdrop_path}`;
  const allData = {
    name: individual.original_title,
    image: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${individual.backdrop_path}`,
    id: parseInt(movie_id),
    price: 20,
  };
  const videolink = `https://www.youtube.com/embed/${video}`;
  // console.log(videolink);
  // console.log("movieName", movieName);
  // console.log("genre", genre);
  return (
    <div className="individualMoviePage">
      <div className="column">
        <div className="top">
          <div className="left">
            <div className="moviePoster">
              <img className="poster" src={poster} alt="movie poster" />
            </div>
            <div className="movieTitle">{individual.original_title}</div>
            <div className="releaseDate">
              Release date: {individual.release_date}
            </div>
            <div className="rating">⭐ {individual.vote_average}/10</div>
            <div className="duration">
              Duration: {individual.runtime} minutes
            </div>
            <Link to="create/">
              <button className="moviePost">Make a Post</button>              
            </Link>

            <input type="button" value="Watch Trailer" onClick={togglePopup} />
            {isOpen && (
              <Popup
                content={
                  <>
                    <div className="trailer">
                      <iframe
                        title="movie trailer"
                        width="560"
                        height="315"
                        src={videolink}
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </>
                }
                handleClose={togglePopup}
              />
            )}
          </div>
          <div className="right">
            <Link to="/shopping-cart/">
              <button onClick={() => onAdd(allData)} className="add">
                Purchase
              </button>
            </Link>
          </div>
        </div>
        <div className="movieDescription">
          <p>{individual.overview}</p>
        </div>
        <div className="discussionSection">
          <p>Discussion:</p>
        </div>
      </div>
    </div>
  );
}
