import React from "react";
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
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
const useStyles = makeStyles({
  root: {
    width: 650,
    margin: 5,
  },
  avatar: {
    backgroundColor: red[500],
  },
});

export default function CommentCard({ comment }) {
  let timeinfo = `${formatDate(comment.created_at)} @ ${formatTime(
    comment.created_at
  )}`;

  let commenter = `${comment.userName} says:`;
  // console.log("comment", comment);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {comment.userName[0].toUpperCase()}
          </Avatar>
        }
        title={commenter}
        subheader={timeinfo}
        component="div"
      />
      <CardActionArea>
        {/* <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="100"
          image="/static/images/cards/contemplative-reptile.jpg"
        title="Contemplative Reptile"
        /> */}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {comment.text}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Posted @ {formatTime(comment.created_at)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Edited: {formatTime(comment.updated_at)}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
