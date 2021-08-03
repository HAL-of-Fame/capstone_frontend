import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { positions } from "@material-ui/system";
import { formatDate, formatTime } from "../../utils/format";
import Box from "@material-ui/core/Box";
import { DeleteOutlined } from '@material-ui/icons'

import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';



import adventure from "../../assets/adventure.jpg"
import action from "../../assets/action.jpg"
import romance from "../../assets/romance.jpg"
import drama from "../../assets/drama.jpg"
import family from "../../assets/family.jpg"
import thriller from "../../assets/thriller.jpg"
import animation from "../../assets/animation.jpg"
import fantasy from "../../assets/fantasy.jpg"
import horror from "../../assets/horror.jpg"
import comedy from "../../assets/comedy.jpg"
import sciencefiction from "../../assets/sciencefiction.jpg"



const Switch = (str) => ({
    "Adventure": adventure,
    "Action": action,
    "Romance": romance,
    "Drama": drama,
    "Comedy": comedy,
    "Family": family,
    "Horror": horror,
    "Fantasy": fantasy,
    "Animation": animation,
    "Thriller": thriller,
    "ScienceFiction": sciencefiction,
})[str] || '';

const useStyles = makeStyles({
  root: {
    width: 750,
  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },

  test: {
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },

});


export default function PostCard({ post }) {
  const [poster, setPoster] = useState("")
  const classes = useStyles();

  useEffect(() => {
    if (post.movieposter) {
      setPoster(post.movieposter)
    } else {
      setPoster(Switch(post.genre))
    }
  }, [post])
  console.log(poster)



  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton onClick={() => console.log('delete')}>
            {/* <MoreVertIcon /> */}
            <DeleteOutlined />
          </IconButton>
        }
        title={post.title}
        subheader="September 14, 2016"
        // titleTypographyProps={
          
        // }
        
      />
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Movie Poster"
          height="110"
          image={poster}
          title="Movie Poster"
        />
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography> */}
          <Typography variant="body2" color="textSecondary" component="p">
            Text: {post.text}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Posted by: {post.userName} @ {formatTime(post.created_at)}
          </Typography>
          <Typography className={classes.test} variant="body2" color="textSecondary" component="p">
            Posted: {formatTime(post.created_at)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Comment
        </Button>
        <Button size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
