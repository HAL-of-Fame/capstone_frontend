import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import NewPostForm from "../NewExercise/NewExercise"
import "./Genres.css";
import apiClient from "../Services/apiClient";
import PostCard from "../PostCard/PostCard"
import {formatDate} from "../../utils/format"


export default function Genres() {
  let { genres } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const addPost = (newPost) => {
    setPosts((oldPosts) => [...oldPosts, newPost]);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await apiClient.fetchAllPostsByGenre(genres);
      if (data) {
        setPosts(data.threads);
      }
      if (error) setError(error);
    };
    fetchPosts();
  }, [genres]);

  console.log("posts", posts);
  return (
    <div className="Genre">
      <div className="subgenre">
        <div className="header">
          <h9>{genres}</h9>
        </div>
        <div className="subheader">Threads</div>
      </div>
      <li className="button">
        <Link
          to={{
            pathname: "/genre",
            search: `/${genres}`,
            hash: "/create",
          }}
        >
          Create a Post
        </Link>
      </li>
      <div className="items">
        {posts.map((post) => (
          <div className="info">
            <li>PostId: {post.id}</li>
            <li>Date: {formatDate(post.created_at)}</li>
            <Link
              to={{
                pathname: "/posts",
                search: `/${post.id}`,
              }}
            >
              <PostCard post={post}/>
              {/* <li>Title: {post.title}</li>
              <li>Text: {post.text}</li> */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
