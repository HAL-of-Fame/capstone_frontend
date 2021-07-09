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
    handleLogout,
    searchInputValue,
    handleOnSearchInputChange
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

            <div className="search-bar">
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={searchInputValue}
              onChange={handleOnSearchInputChange}
            />
            <i className="material-icons">search</i>
          </div>
        <ul className="links">
          <li>
            <Link to="/genre">Genre</Link>
          </li>
          <li>
            <Link to="/trending">Trending</Link>
          </li>
          <li>
            <Link to="/newreleases">New Releases</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          <div className="cart">
              <Link to="/shopping-cart">
                My Cart
                <i className="material-icons">shopping_cart</i>
              </Link>
            </div>
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