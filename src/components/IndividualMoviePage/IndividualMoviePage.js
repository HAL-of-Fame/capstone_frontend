import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./IndividualMoviePage.css";
import Popup from "../Popup/Popup";
import "../../components/Popup/Popup.css";
import apiClient from "../Services/apiClient";
import config from "../../config";
import PostCard from "../PostCard/PostCard";
import PostList from "../PostList/PostList";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const api_key = config.api_key;

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function IndividualMoviePage(props) {
  const {
    onAdd,
    genre,
    setGenre,
    movieName,
    setMovieName,
    moviePoster,
    setMoviePoster,
    user,
  } = props;
  const [individual, setIndividual] = useState([]);
  const [video, setVideo] = useState("");
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const fetchPosts = async () => {
    const { data, error } = await apiClient.listMoviePosts(movieName);
    if (data) {
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
      if (responseVidData.results.length > 0) {
        setVideo(responseVidData.results[0].key);
      } else {
        setVideo(null);
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
      setMoviePoster(
        `https://www.themoviedb.org/t/p/original/${individual.backdrop_path}`
      );
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

  // console.log('individual', individual)
  // console.log('posts', posts)

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

            <div className="trailer">
              {video ? (
                <input
                  type="button"
                  value="Watch Trailer"
                  onClick={togglePopup}
                />
              ) : (
                <div className="teste">
                  <p>No trailer available</p>
                </div>
              )}

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
            <Link to="/shopping-cart/">
              <button onClick={() => onAdd(allData)} className="add">
                Purchase
              </button>
            </Link>
          </div>
        </div>
        {/* <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {individual.overview}
          </Typography>
          <Typography variant="h5" component="h2">
            {individual.overview}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {individual.overview}
          </Typography>
          <Typography variant="body2" component="p">
            {individual.overview}
          </Typography>
        </CardContent> */}
        <div className="movieDescription">
          <p>{individual.overview}</p>
        </div>
        <div className="discussionSection">
          <p>Discussion:</p>
          <div className="PostButton">
            <Link to="create/">
              <Button size="small" color="primary" variant="contained">
                Create a Post
              </Button>
            </Link>
          </div>
          <PostList posts={posts} user={user} />
        </div>
      </div>
    </div>
  );
}
