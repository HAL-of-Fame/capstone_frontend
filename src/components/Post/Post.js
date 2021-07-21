// import { Link } from "react-router-dom"
// import Stars from "../Stars/Stars"
// import { formatRating, formatDate } from "../../utils/format"
import "./Post.css"

export default function Post({ post, user }) {
//   const userOwnsPost = user?.username && exercise?.user_id === user?.username

  return (
    <div className="Post">
      <div className="ExerciseCard">
        <div className="header1">
          <p className="name">{post.title}</p>
        </div>
        <div className="stats">
          <div className="stat">
            <p>Text</p>
            <span>{post.text}</span>
          </div>
        </div>
      </div>
    </div>
  )
}