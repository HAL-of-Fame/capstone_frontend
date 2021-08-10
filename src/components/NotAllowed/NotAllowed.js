import { Link } from "react-router-dom";
import "./NotAllowed.css";

export default function NotAllowed() {
  return (
    <div className="NotAllowed">
      <h2>You must be logged in to do this</h2>
      <span>
        <Link to="/login">here</Link>
      </span>
    </div>
  );
}
