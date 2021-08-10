import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./IndividualMoviePage.css";
import Popup from "../Popup/Popup";
import "../../components/Popup/Popup.css";
import Grid from "@material-ui/core/Grid";
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
import { formatDate } from "../../utils/format";
const api_key = config.api_key;

const useStyles = makeStyles({
  root: {
    minWidth: 750,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  description: {
    maxWidth: 500,
    display: "flex",
    alignItems: "center",
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
    movieId,
    setMovieId,
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
  setMovieId(movie_id);
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
  }, [movieName]);

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
          <div className="moviePoster">
            <img className="poster" src={poster} alt="movie poster" />
          </div>
        </div>
        <div className="trailerPurchase">
          <div className="trailer">
            {video ? (
              <Button
                variant="contained"
                onClick={() => {
                  window.scrollTo({ top: 0 });
                  togglePopup();
                }}
                size="small"
                color="primary"
              >
                Watch Trailer
              </Button>
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
                        width="760"
                        height="415"
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
            <Button
              className="add"
              variant="contained"
              onClick={() => onAdd(allData)}
              size="small"
              color="primary"
            >
              Purchase
            </Button>
          </Link>
        </div>
        <Card className={classes.root}>
          <CardContent>
            <Grid item container direction="row" justifyContent="space-around">
              <CardContent justifyContent="center" flexDirection="column">
                <Typography
                  className={classes.description}
                  variant="h5"
                  component="p"
                >
                  {individual.original_title}
                </Typography>
                <Typography
                  className={classes.description}
                  variant="caption"
                  component="p"
                >
                  {formatDate(individual.release_date)}
                </Typography>
                <Typography
                  className={classes.description}
                  variant="caption"
                  component="p"
                >
                  ⭐ {individual.vote_average}/10
                </Typography>
                <Typography
                  className={classes.description}
                  variant="caption"
                  component="p"
                >
                  {individual.runtime} minutes
                </Typography>
              </CardContent>
              <Typography
                className={classes.description}
                variant="body2"
                component="p"
              >
                {individual.overview}
              </Typography>
            </Grid>
          </CardContent>
        </Card>
        <div className="discussionSection">
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
