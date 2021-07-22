import Post from "../Post/Post";
import { Link, useParams } from "react-router-dom";
// import NewPostForm from "../NewExercise/NewExercise"
import "./Threads.css";
// import apiClient from "../../services/apiClient"

export default function Threads() {
  let { genres } = useParams();
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
          }}>Create a Post</Link>
      </li>
    </div>
  );
}
