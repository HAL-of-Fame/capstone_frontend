import { Link } from "react-router-dom"
// import logo from "../../assets/codepath.svg"
// import person from "../../assets/person.svg"
// import Twitter from "../Icons/Twitter"
// import Instagram from "../Icons/Instagram"
// import Facebook from "../Icons/Facebook"
import "./Navbar.css"

export default function Navbar(
  {
    user,
    handleLogout 
  }
) {
  return (
    <nav className="Navbar">
      <div className="content">
        <div className="logo">
          {/* <Link to="/">
            <img src={logo} alt="codepath logo" />
          </Link> */}
        </div>

        {/* <div className="socials">
          <Twitter fill="var(--pure-white)" />
          <Instagram fill="var(--pure-white)" />
          <Facebook fill="var(--pure-white)" />
        </div> */}

        <ul className="links">
          <li>
            <Link to="/activity">Activity</Link>
          </li>
          <li>
            <Link to="/exercise">Exercise</Link>
          </li>
          <li>
            <Link to="/nutrition">Nutrition</Link>
          </li>
          <li>
            <Link to="/sleep">Sleep</Link>
          </li>
          <div className="auth">
          {user?.email ? (
            <>
              <li>
                <span>{user.email}</span>
              </li>

              <li>
                <span onClick={handleLogout}>Logout</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
            </>
          )}
            </div>
        </ul>
      </div>
      
    </nav>
  )
}