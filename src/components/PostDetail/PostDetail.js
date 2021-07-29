import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import Stars from "../Stars/Stars"
// import StarsInput from "../StarsInput/StarsInput"
// import { formatRating, formatDate } from "../../utils/format"
import apiClient from "../Services/apiClient";
import "./PostDetail.css";

import Popup from "../Popup/Popup";
import "../../components/Popup/Popup.css";

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

export default function PostDetail({ user, updatePost }) {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [rating, setRating] = useState(null);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSavingRating, setIsSavingRating] = useState(false);
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
      const genre = data.post.genre
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

  const handleOnSaveRating = async () => {
    setIsSavingRating(true);

    const { data, error } = await apiClient.createRatingForPost({
      postId,
      rating,
    });
    if (data) {
      await fetchPostById({
        postId,
        setIsFetching,
        setError,
        setPost,
        setText,
        setTitle,
      });
    }
    if (error) {
      setError(error);
    }

    setIsSavingRating(false);
  };
  
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
            {/* <span className="rating">
              <Stars rating={post.rating || 0} max={5} />
              {formatRating(post.rating || 0)}
            </span> */}
            <p className="text">Title: {post.title}</p>
            <p className="text">Text: {post.text}</p>
          </div>
        </div>
        <div className="Comments">
          <p>Comments:</p>
          {comments.map((comment) => (
            <div className="test">
              {comment.text}-{comment.userName}
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
        
          <div className="comment-section">
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              name="text"
            ></textarea>
            <button className="btn" onClick={handleOnSaveComment}>
              Save Comment
            </button>
          </div>
  
        <input type="button" value="Edit post" onClick={togglePopup} />
        {isOpen && (
          <Popup
            content={
              <>
                <div className="edit-post">
                  <p>Edit your post</p>
                  <textarea
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    name="title"
                  ></textarea>
                  <textarea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    name="text"
                  ></textarea>
                  <button className="btn" onClick={handleOnUpdate}>
                    {isUpdating ? "Loading..." : "Save Post"}
                  </button>
                  <button className="btn" onClick={handleOnDelete}>
                    {isUpdating ? "Loading..." : "Delete Post"}
                  </button>
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
