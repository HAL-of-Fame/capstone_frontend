import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Genres.css";
import apiClient from "../Services/apiClient";
import PostCard from "../PostCard/PostCard";
// import { formatDate } from "../../utils/format";
import adventure from "../../assets/adventure.jpg";
import action from "../../assets/action.jpg";
import romance from "../../assets/romance.jpg";
import drama from "../../assets/drama.jpg";
import family from "../../assets/family.jpg";
import thriller from "../../assets/thriller.jpg";
import animation from "../../assets/animation.jpg";
import fantasy from "../../assets/fantasy2.jpg";
import horror from "../../assets/horror.jpg";
import comedy from "../../assets/comedy2.jpg";
import sciencefiction from "../../assets/sciencefiction.jpg";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
export default function Genres({ user }) {
  let { genres } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

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

  const Switch = (str) =>
    ({
      Adventure: adventure,
      Action: action,
      Romance: romance,
      Drama: drama,
      Comedy: comedy,
      Family: family,
      Horror: horror,
      Fantasy: fantasy,
      Animation: animation,
      Thriller: thriller,
      ScienceFiction: sciencefiction,
    }[str] || "");

  return (
    <div className="Genre">
      <div className="subgenre">
        <div className="header">
          <Typography variant="h2">{genres}</Typography>
        </div>
        <div className="hero">
          <img src={Switch(genres)} alt={genres}></img>
        </div>
      </div>
      <li className="button">
        <Link
          to={{
            pathname: "/genre",
            search: `/${genres}`,
            hash: "/create",
          }}
        >
          <Button size="small" color="primary" variant="contained">
            Create a Post
          </Button>
        </Link>
      </li>
      <div className="items">
        {posts.map((post) => (
          <div className="info">
            <Link
              to={{
                pathname: "/posts",
                search: `/${post.id}`,
              }}
            >
              <PostCard post={post} user={user} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
