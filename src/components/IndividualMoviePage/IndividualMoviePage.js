import { Link } from "react-router-dom";
import "./IndividualMoviePage.css";

export default function IndividualMoviePage() {
  //   if (!user) {
  //     return <NotAllowed />
  //   }
  return (
    <div className="individualMoviePage">
      <h8 className="intro">Movie</h8>
      <div className="test">
      <Link to="create">
        <button>This is a button</button>
      </Link>
      </div>
      <div className="column">
        <div className="moviePoster"></div>
        <div className="movieTitle">Movie Title</div>
        <div className="rating">Rating</div>
      </div>
      <div className="movieDescription">Description: blah blah</div>

    </div>
  );
}
