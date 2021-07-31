import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import NewPostForm from "../NewExercise/NewExercise"
import "./Genres.css";
import apiClient from "../Services/apiClient";
import PostCard from "../PostCard/PostCard"
import {formatDate} from "../../utils/format"
import adventure from "../../assets/adventure.jpg"
import action from "../../assets/action.jpg"

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



  const Switch = (str) => ({
    "Adventure": adventure,
    "Action": action,
  })[str] || '';
  
  console.log('genres', genres)
  console.log('switch', Switch(genres))
  // console.log(Switch("Yes")); // 517
  // console.log(Switch("No"));  // 518
  // console.log(Switch("Non matching value")); // Empty

  console.log("posts", posts);
  return (
    <div className="Genre">
      <div className="subgenre">
        <div className="header">
          <h9>{genres}</h9>
        </div>
        <div className="hero">
            <img src={Switch(genres)} alt={genres}></img>
        {/* {genres === 'Adventure' ? <img src={adventure} alt="adventure" /> 
        : 
        {genres === 'Action' ? <img src={action} alt="action" />} */}

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
