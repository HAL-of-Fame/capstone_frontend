import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import apiClient from "../Services/apiClient";
import "./PostDetail.css";
import PostCard from "../PostCard/PostCard";
import CommentCard from "../CommentCard/CommentCard";
import Popup from "../Popup/Popup";
import "../../components/Popup/Popup.css";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";

const fetchPostById = async ({
  postId,
  setIsFetching,
  setError,
  setPost,
  setText,
}) => {
  setIsFetching(true);

  const { data, error } = await apiClient.fetchPostById(postId);
  if (data) {
    setPost(data.post);
    setText(data.post.text);
    // setTitle(data.post.title);
  }
  if (error) {
    setError(error);
  }

  setIsFetching(false);
};

const useStyles = makeStyles({
  field: {
    marginTop: 0,
    marginBotttom: 20,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    fontWeight: 500,
  },
  input: {
    color: "white",
  },
  button: {
    color: "white",
    marginTop: "10px",
    borderColor: "white",
    borderRadius: "5px",
  },
  editor: {
    margin: "20px",
  },
});

export default function PostDetail({ user, updatePost }) {
  const classes = useStyles();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const listAllComments = async () => {
    const { data, error } = await apiClient.listAllComments(postId);
    if (data) {
      setComments(data.comments);
    }
    if (error) setError(error);
  };

  useEffect(() => {
    fetchPostById({
      postId,
      setIsFetching,
      setTitle,
      setError,
      setPost,
      setText,
    });

    listAllComments();
  }, [postId]);

  let Navigate = useNavigate();

  const handleOnDelete = async () => {
    const { data, error } = await apiClient.deletePostById({ postId });
    if (data) {
      const genre = data.post.genre;
      Navigate(`/genre/${genre}`);
    }
    if (error) setError(error);
    else {
      console.log("succeeded in deleting");
    }
  };

  const handleOnUpdate = async () => {
    setIsUpdating(true);

    const postUpdate = { text, title };
    const { data, error } = await apiClient.updatePost({ postId, postUpdate });
    if (data) {
      setPost({ ...post, text: data.post.text, title: data.post.title });
      updatePost({ postId, postUpdate });
    }
    if (error) {
      setError(error);
    }

    setIsUpdating(false);
  };

  const handleOnSaveComment = async () => {
    setIsUpdating(true);
    const { data, error } = await apiClient.createComment(comment, postId);
    if (data) {
      listAllComments();
    }
    if (error) setError(error);
    setIsUpdating(false);
  };

  // const handleOnSaveRating = async () => {
  //   setIsSavingRating(true);

  //   const { data, error } = await apiClient.createRatingForPost({
  //     postId,
  //     rating,
  //   });
  //   if (data) {
  //     await fetchPostById({
  //       postId,
  //       setIsFetching,
  //       setError,
  //       setPost,
  //       setText,
  //       setTitle,
  //     });
  //   }
  //   if (error) {
  //     setError(error);
  //   }

  //   setIsSavingRating(false);
  // };

  const userIsLoggedIn = Boolean(user?.email);
  const userOwnsPost = user?.username && post?.userName === user?.username;
  // console.log("userOwnsPost is", userOwnsPost)
  if (!post && !isFetching) return null;
  if (!post) return <h1>Loading...</h1>;

  return (
    <div className="PostDetail">
      <div className="Post">
        <div className="body">
          <div className="info">
            <PostCard post={post} user={user} />
            {/* <p className="text">Title: {post.title}</p>
            <p className="text">Text: {post.text}</p> */}
          </div>
        </div>
        {userOwnsPost === true && (
          <div className="alter">
            <Box display="flex" justifyContent="center">
              <Button
                className={classes.editor}
                onClick={togglePopup}
                size="small"
                variant="contained"
                color="secondary"
              >
                Edit
              </Button>

              <Button
                className={classes.editor}
                onClick={handleOnDelete}
                size="small"
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </Box>
          </div>
        )}
        <div className="Comments">
          <p>Comments:</p>
          <div className="comment-section">
            {/* <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              name="text"
            ></textarea> */}

            <form noValidate autoComplete="off" onSubmit={handleOnSaveComment}>
              <TextField
                onChange={(e) => setComment(e.target.value)}
                className={classes.field}
                label="Comment"
                variant="filled"
                color="primary"
                required
                fullWidth
                InputProps={{
                  className: classes.input,
                }}
                // size="large"
              />
              <div className="saveButton">
                <Button
                  onClick={handleOnSaveComment}
                  startIcon={<SaveIcon />}
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </div>
              {/* <button className="btn" onClick={handleOnSaveComment}>
              Save Comment
            </button> */}
              {/* </div> */}
            </form>
          </div>
          {comments.map((comment) => (
            <div className="test">
              <CommentCard comment={comment} user={user} />
            </div>
          ))}
          {/* <textarea
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              name="comments"
            ></textarea>
              <button className="btn" onClick={handleOnSaveComment}>
              {isUpdating ? "Loading..." : "Save Comment"}
            </button> */}
        </div>
      </div>

      {error && <span className="error">Error: {error}</span>}

      <div className="actions">
        {/* <input type="button" value="Edit post" onClick={togglePopup} /> */}
        {isOpen && (
          <Popup
            content={
              <>
                <div className="edit-post">
                  <p>Edit your post</p>
                  <p>Title</p>
                  <TextField
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    name="title"
                  ></TextField>
                  <p>Text</p>
                  <TextField
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    name="text"
                    required
                  ></TextField>
                  <Button
                    className={classes.button}
                    onClick={handleOnUpdate}
                    variant="outlined"
                  >
                    {isUpdating ? "Loading..." : "Save Post"}
                  </Button>
                  <Button
                    className={classes.button}
                    onClick={handleOnDelete}
                    variant="outlined"
                  >
                    {isUpdating ? "Loading..." : "Delete Post"}
                  </Button>
                </div>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    </div>
  );
}
