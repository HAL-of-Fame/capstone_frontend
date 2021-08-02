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


// Switch(genre) {
//   case 'Adventure': 
//       setPoster(adventure);
//       break;
//   case 'Action':
//     setPoster(action);
//       break;
//   case 'Romance':
//       setPoster(romance);
//       break;
//   case 'Drama':
//     setPoster(drama);
//     break;
//   case 'Family':
//     setPoster(family);
//     break;
//   case 'Thriller':
//     setPoster(thriller);
//     break;
//   case 'Animation':
//     setPoster(animation);
//     break;
//   case 'Thriller':
//     setPoster(thriller);
//     break;
//   default:
//       break;
// }


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
  box: {
    height: 100,
    display: "flex",
    border: "1px solid black",
    padding: 8,
  },
  topRightBox: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
});


export default function PostCard({ post }) {
  const [poster, setPoster] = useState("")
  console.log("post", post);
  console.log('post.movieposter', post.movieposter)
  console.log('post.genre', post.genre
  )
  const classes = useStyles();

  // console.log("this is eval", eval("family"))
  console.log('test', window["family"])

  useEffect(() => {
    if (post.movieposter) {
      console.log(' i made it past the conditional', post.movieposter)
      setPoster(post.movieposter)
    } else {
      setPoster(Switch(post.genre))
      // console.log('made it to the else')
      // console.log('this is the assets thing', `../../assets/${post.genre.toLowerCase()}.jpg`)
      // setPoster(import post.genre.toLowerCase() from `../../assets/${post.genre.toLowerCase()}.jpg`)
      // import sciencefiction from "../../assets/sciencefiction.jpg"
      // setPoster(eval(post.genre.toLowerCase()))
      // setPoster(Switch(post.genre))
    }
  }, [post])
  console.log(poster)



  return (
    <Card className={classes.root}>
      <Box
        component="span"
        m={1} //margin
        className={`${classes.topRightBox} ${classes.box}`}
      >
        <Button variant="contained" color="primary" style={{ height: 40 }}>
          Primary
        </Button>
      </Box>

      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="110"
          image={poster}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Text: {post.text}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Posted by: {post.userName} @ {formatTime(post.created_at)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Posted: {formatTime(post.created_at)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Comment
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
