import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";
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
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSavingRating, setIsSavingRating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPostById({ postId, setIsFetching, setError, setPost, setText });
  }, [postId]);

  const handleOnUpdate = async () => {
    setIsUpdating(true);

    const postUpdate = { text };

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
      });
    }
    if (error) {
      setError(error);
    }

    setIsSavingRating(false);
  };

  const userIsLoggedIn = Boolean(user?.email);
  const userOwnsPost = user?.username && post?.username === user?.username;

  if (!post && !isFetching) return null;
  if (!post) return <h1>Loading...</h1>;

  return (
    <div className="PostDetail">
      {/* <div className="Post">
        <div
          className="media"
          style={{
            backgroundImage: `url(${post.imageUrl})`,
          }}
          to={`/posts/${post.id}`}
        />

        <div className="body">
          <div className="info">
            <p className="text">{post.text}</p>
            <span className="rating">
              <Stars rating={post.rating || 0} max={10} />
              {formatRating(post.rating || 0)}
            </span>
          </div> */}
      {/* 
          <div className="meta">
            <span className="date">{formatDate(post.createdAt)}</span>
            <span className="user">@{post.username}</span>
          </div>
        </div>
      </div> */}

      {error && <span className="error">Error: {error}</span>}

      <div className="actions">
        {userOwnsPost ? (
          <div className="edit-post">
            <p>Edit your post</p>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              name="text"
            ></textarea>
            <button className="btn" onClick={handleOnUpdate}>
              {isUpdating ? "Loading..." : "Save Post"}
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
