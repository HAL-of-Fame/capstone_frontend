import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../Services/apiClient";
import "./PostDetail.css";

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

  useEffect(() => {
    fetchPostById({
      postId,
      setIsFetching,
      setTitle,
      setError,
      setPost,
      setText,
    });
  }, [postId]);


  let Navigate = useNavigate();

  const handleOnDelete = async () => {
    console.log(postId)
    const { data, error } = await apiClient.deletePostById({ postId });
    if (error) setError(error);
    else {
      console.log("succeeded in deleting");

      Navigate("/");
    }
  };

  const handleOnUpdate = async () => {
    setIsUpdating(true);

    const postUpdate = { text, title };
    // console.log("postUpdate", postUpdate);
    const { data, error } = await apiClient.updatePost({ postId, postUpdate });
    // console.log("after api call data", data);
    if (data) {
      setPost({ ...post, text: data.post.text, title: data.post.title });
      updatePost({ postId, postUpdate });
    }
    if (error) {
      setError(error);
    }

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
            <p className="text">Title: {post.title}</p>
            <p className="text">Text: {post.text}</p>
          </div>
        </div>
      </div>

      {error && <span className="error">Error: {error}</span>}

      <div className="actions">
        {userOwnsPost ? (
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
        ) : (
          <div className="rate-setup">
            <p>Rate this setup</p>
            {/* <StarsInput value={rating} setValue={setRating} max={10} /> */}
            <button
              className="btn"
              onClick={handleOnSaveRating}
              disabled={!userIsLoggedIn}
            >
              {isSavingRating ? "Loading..." : "Save Rating"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
