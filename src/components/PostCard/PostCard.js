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
import { yellow } from "@material-ui/core/colors";
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
  },
});

export default function PostCard({ post, user }) {
  // const userOwnsPost = user?.username && post?.userName === user?.username;
  // console.log("postcard", post);
  let timeinfo = `by ${post.userName} - ${formatDate(
    post.created_at
  )} @ ${formatTime(post.created_at)}`;
  const [poster, setPoster] = useState("");
  const [edited, setEdited] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (post.movieposter) {
      setPoster(post.movieposter);
    } else {
      setPoster(Switch(post.genre));
    }
  }, [post]);

  useEffect(() => {
    if (post.created_at !== post.updated_at) {
      setEdited(true);
    }
  }, [post.updated_at]);

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
            {edited && (
              <Typography variant="caption" color="textSecondary" component="p">
                [Updated: {formatDate(post.updated_at)} @
                {formatTime(post.updated_at)}]
              </Typography>
            )}
            {/* {post.created_at !== post.updated_at && (
              <Typography variant="caption" color="textSecondary" component="p">
                [Updated: {formatDate(post.updated_at)} @
                {formatTime(post.updated_at)}]
              </Typography>
            )} */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Comment
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
