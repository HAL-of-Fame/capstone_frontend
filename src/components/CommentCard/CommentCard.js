import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { positions } from '@material-ui/system';
import { formatDate, formatTime } from "../../utils/format"

const useStyles = makeStyles({
  root: {
    width: 650,
    margin: 5
  },
});

export default function CommentCard( {comment}) {
    console.log('comment', comment)
    const classes = useStyles();
  return (
    <Card className={classes.root}>
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
            Text: {comment.text}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Posted @ {formatTime(comment.created_at)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Edited: {formatTime(comment.updated_at)}
          </Typography>
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