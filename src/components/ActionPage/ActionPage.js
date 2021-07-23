import Post from "../Post/Post"
import { Link } from "react-router-dom"
// import NewPostForm from "../NewExercise/NewExercise"
import "./ActionPage.css"
// import apiClient from "../../services/apiClient"

export default function Action({ user, posts }){
return (
    <div className="Exercise">
    <div className="exercise">
        <div className="header"><h9>Action</h9></div>
        <div className="subheader">Current Forums</div>
        {/* <div className="notfound"><h8>Nothing here yet.</h8></div> */}
        </div>
        <li className="button">
            <Link to="/genre/action/create">Create New Post</Link>
          </li>
      <div className="feed">
        {posts?.map((post) => (
        <Post post={post} key={post.id} user={user} />
        ))}
      </div>
    </div>
)}