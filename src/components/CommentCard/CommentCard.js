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
import apiClient from "../Services/apiClient";
import { useNavigate } from "react-router";
const useStyles = makeStyles({
  root: {
    width: 450,
    margin: 5,
    // height: 100,
  },
  avatar: {
    backgroundColor: red[500],
  },
});

export default function CommentCard({ setComments, comment, user }) {
  console.log("comment", comment);
  let Navigate = useNavigate();
  let commentId = comment.id;

  const handleOnDeleteComment = async () => {
    const { data, error } = await apiClient.deleteCommentById({ commentId });
    if (data) {
      console.log("i deleted", data);
      console.log("commentId", commentId);
      setComments((oldComments) =>
        oldComments.filter((comment) => comment.id !== commentId)
      );
      // window.location.reload();
    } else {
      console.log("did not succeeded in deleting");
    }
  };

  const handleOnUpdateComment = async () => {
    // const commentUpdate = { text };
    const { data, error } = await apiClient.updateComment({
      commentId,
      // commentUpdate,
    });
    if (data) {
      console.log("commentcard after the api call", data);
      // setPost({ ...post, text: data.post.text, title: data.post.title });
      // updatePost({ postId, postUpdate });
      // setEdited(true);
      // window.location.reload();
    }
    if (error) {
      console.log("error in commentcard", error);
    }
  };

  let timeinfo = `${formatDate(comment.created_at)} @ ${formatTime(
    comment.created_at
  )}`;
  const userOwnsComment =
    user?.username && comment?.userName === user?.username;
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
      />
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {comment.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className="testing">
          {userOwnsComment === true && (
            <div className="altering">
              {/* <Button
                onClick={handleOnUpdateComment}
                size="small"
                color="primary"
              >
                Edit
              </Button> */}
              <Button
                size="small"
                onClick={handleOnDeleteComment}
                color="primary"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </CardActions>
    </Card>
  );
}
