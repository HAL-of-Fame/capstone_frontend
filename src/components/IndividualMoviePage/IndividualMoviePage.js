import { Link } from "react-router-dom";
import "./IndividualMoviePage.css";

export default function IndividualMoviePage() {
  //   if (!user) {
  //     return <NotAllowed />
  //   }
  return (
    <div className="individualMoviePage">
      <h8 className="intro">Movie</h8>
      <div className="side">
        <div className="column">
          <div className="moviePoster"></div>
          <div className="movieTitle">Movie Title</div>
          <div className="rating">Rating</div>
          <div className="movieDescription">
              <p>Description: "shdfshgadgdsgdsafgdsgdsgadsgdsagdsgdsgadsgdsgadsgadsgdsagadsgsgadgadsgadsgagsdfshdfhdfshfhdsfhdfshfdhdfshdfhfshshdfhfhshdfhhsdLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
          </div>
          <div className="discussionSection">
              <p>Discussion:</p>
          </div>
        </div>
        <div className="test">
          <Link to="create">
            <button>This is a button</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
