import { Link } from "react-router-dom";
import search from "../../logos/search.svg";
// import logo from "../../assets/codepath.svg"
// import person from "../../assets/person.svg"
// import Twitter from "../Icons/Twitter"
// import Instagram from "../Icons/Instagram"
// import Facebook from "../Icons/Facebook"
import "./Navbar.css";

export default function Navbar({
  user,
  handleLogout,
  searchInputValue,
  handleOnSearchInputChange,
}) {
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

        <div className="search-bar-btn">
          <input
            className="search-bar"
            type="text"
            name="search"
            placeholder="Search"
            value={searchInputValue}
            onChange={handleOnSearchInputChange}
          />
          <div className="search-btn">
            <img
              className="pic"
              src={search}
              alt="search button"
              width="39px"
              height="37.85px"
            />
          </div>
        </div>
        <ul className="links">
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
  );
}
