import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import NewPostForm from "../NewExercise/NewExercise"
import "./Genres.css";
import apiClient from "../Services/apiClient";

export default function Genres() {
  let { genres } = useParams();
  console.log(genres);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const addPost = (newPost) => {
    setPosts((oldPosts) => [...oldPosts, newPost]);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await apiClient.fetchAllPostsByGenre(genres);
      if (data) {
        // console.log('i am in data', data)
        // console.log('this is data.threads', data.threads)
        setPosts(data.threads);
      }
      if (error) setError(error);
    };
    fetchPosts();
  }, [genres]);

  // const listPosts = posts.map((post) =>  <li>{post}</li>);
  // const numbers = [1, 2, 3, 4, 5];
  // const listItems = numbers.map((number) =>  <li>{number}</li>);

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
            <li>Title: {post.title}</li>
            <li>Text: {post.text}</li>
          </div>
        ))}
      </div>
    </div>
  );
}
