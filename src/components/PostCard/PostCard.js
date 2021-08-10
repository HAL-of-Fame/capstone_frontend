import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { formatDate, formatTime } from "../../utils/format";
import "./PostCard.css";
import CardHeader from "@material-ui/core/CardHeader";

import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
import { yellow } from "@material-ui/core/colors";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";

import adventure from "../../assets/adventure.jpg";
import action from "../../assets/action.jpg";
import romance from "../../assets/romance.jpg";
import drama from "../../assets/drama.jpg";
import family from "../../assets/family.jpg";
import thriller from "../../assets/thriller.jpg";
import animation from "../../assets/animation.jpg";
import fantasy from "../../assets/fantasy2.jpg";
import horror from "../../assets/horror.jpg";
import comedy from "../../assets/comedy2.jpg";
import sciencefiction from "../../assets/sciencefiction.jpg";
import { relativeTimeRounding } from "moment";

const Switch = (str) =>
  ({
    Adventure: adventure,
    Action: action,
    Romance: romance,
    Drama: drama,
    Comedy: comedy,
    Family: family,
    Horror: horror,
    Fantasy: fantasy,
    Animation: animation,
    Thriller: thriller,
    ScienceFiction: sciencefiction,
  }[str] || "");

const useStyles = makeStyles({
  root: {
    width: 550,
    position: `relative`,
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: yellow[700],
  },
  poster: {
    height: 280,
    // maxHeight: 200,
    // maxWidth: 200,
  },
  overlay: {
    position: "absolute",
    // top: "30%",
    top: "70px",
    // bottom: "30%",
    left: "5px",
    // left: "80%",
    color: "black",
    backgroundColor: "white(255, 255, 255, 1.0)",
  },
});

export default function PostCard({ post, user }) {
  // const userOwnsPost = user?.username && post?.userName === user?.username;
  // console.log("postcard", post);
  let timeinfo = `by ${post.userName} - ${formatDate(
    post.created_at
  )} @ ${formatTime(post.created_at)}`;
  const [poster, setPoster] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (post.movieposter) {
      setPoster(post.movieposter);
    } else {
      setPoster(Switch(post.genre));
    }
  }, [post]);

  return (
    <div className="all">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {post.userName[0].toUpperCase()}
            </Avatar>
          }
          title={post.title}
          subheader={timeinfo}
        />
        <CardActionArea>
          <Typography variant="body1" color="textSecondary" component="p">
            {post.text}
          </Typography>

          {post.movieid ? (
            <Link
              to={{
                pathname: "/movie",
                search: `/${post.movieid}`,
              }}
            >
              <CardMedia
                component="img"
                className={classes.poster}
                alt={post.moviename}
                image={poster}
                title={post.moviename}
              />
              {/* <div className={classes.overlay}>
                <p>{post.moviename}</p>
              </div> */}
            </Link>
          ) : (
            <Link
              to={{
                pathname: "/genre",
                search: `/${post.genre}`,
              }}
            >
              <CardMedia
                component="img"
                alt="Movie Poster"
                // height="100"
                className={classes.poster}
                image={poster}
                title="Movie Poster"
              />
            </Link>
          )}
          <CardContent>
            {post.created_at !== post.updated_at && (
              <Typography variant="caption" color="textSecondary" component="p">
                [Updated: {formatDate(post.updated_at)} @
                {formatTime(post.updated_at)}]
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Comment
          </Button>
          {/* <div className="sadf">
            {userOwnsPost === true && (
              <div className="tea">
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="primary">
                  Delete
                </Button>
              </div>
            )}
          </div> */}
          {/* {userOwnsPost ? (
            <div className="tea">
              <Button size="small" color="primary">
                Comment
              </Button>
              <Button size="small" color="primary">
                Delete
              </Button>
            </div>
          ) : (
            <Button size="small" color="primary">
              Edit
            </Button>
          )} */}
        </CardActions>
      </Card>
    </div>
  );
}
