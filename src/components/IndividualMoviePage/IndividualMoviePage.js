import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./IndividualMoviePage.css";
import Popup from "../Popup/Popup";
import "../../components/Popup/Popup.css";
import apiClient from "../Services/apiClient";

// const api_key = "765ece2c111fb5c30abfeb28d365ac2c";
const api_key = "d8e8e9a8ed16ae9fd3ea37274ab553aa";

export default function IndividualMoviePage(props) {
  const { onAdd, genre, setGenre, movieName, setMovieName } = props;
  const [individual, setIndividual] = useState([]);
  const [video, setVideo] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const fetchPosts = async () => {
    const { data, error } = await apiClient.listMoviePosts(movieName);
    if (data) {
      console.log("this is listmovieposts", data.posts);
      setPosts(data.posts);
    }
    if (error) setError(error);
  };

  // will strip the movie_id from the URL (holds movie ID)
  const { movie_id } = useParams();

  useEffect(() => {
    const fetchIndividual = async () => {
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
      }
    };

    const fetchVideo = async () => {
      const viddata = await fetch(
        `https://api.themoviedb.org/3/movie/` +
          movie_id +
          `/videos?api_key=` +
          api_key +
          `&language=en-US`
      );
      const responseVidData = await viddata.json();
      if (responseVidData) {
        setVideo(responseVidData.results[0].key);
      }
    };

    fetchIndividual();
    fetchVideo();
    fetchPosts();
  }, []);

  useEffect(() => {
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
      const movieName = individual.original_title;
      setMovieName(movieName);
      fetchPosts();
      if (individual?.genres?.length > 0) {
        individual.genres.map((genreobj) => {
          if (genreOptions.includes(genreobj.name) === true) {
            const genre = genreobj.name;
            setGenre(genre);
          }
        });
      }
    };

    setGenreMovieName();
  }, [individual, video]);

  // console.log(individual.genres)
  const poster = `https://www.themoviedb.org/t/p/original/${individual.backdrop_path}`;
  const allData = {
    name: individual.original_title,
    image: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${individual.backdrop_path}`,
    id: parseInt(movie_id),
    price: 20,
  };
  const videolink = `https://www.youtube.com/embed/${video}`;

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
          {posts?.map((post) => (
            <div className="test">
              <Link
                to={{
                  pathname: "/posts",
                  search: `/${post.id}`,
                }}
              >
                id:{post.id}-{post.title}-{post.text}-{post.userName}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
