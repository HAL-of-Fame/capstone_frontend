import { Link } from "react-router-dom";
import search from "../../assets/search.svg";
// import logo from "../../assets/codepath.svg"
// import logo from "../../assets/demoLogo.png"
// import person from "../../assets/person.svg"
// import Twitter from "../Icons/Twitter"
// import Instagram from "../Icons/Instagram"
// import Facebook from "../Icons/Facebook"
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import { useState } from "react";

export default function Navbar({ user, handleLogout }) {
  // const handleOnSubmit = async () => {
  //   const data = await fetch(
  //     `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchInputValue}&page=1`
  //   );
  //   const searchedMovies = await data.json()
  //   if (searchedMovies) {

  //   }
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleOnInputChange = (event) => {
    if (event.target.value) {
      setSearchInputValue(event.target.value);
    }
  };

  return (
    <nav className="Navbar">
      <div className="content">
        <div className="logo">
          <Link to="/">
            <img
              src={require("../../assets/demoLogo.png").default}
              height={50}
              width={50}
              alt="Demo Logo"
            />
          </Link>
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
            onChange={handleOnInputChange}
          />

          <Link to={`search/${searchInputValue}`} className="search-btn">
            <img
              className="pic"
              src={search}
              alt="search button"
              width="39px"
              height="37.85px"
            />
          </Link>
        </div>

        <div className="links">
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
                <div className="Loginbut">
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </div>
                <div className="Register">
                  <li>
                    <Link to="/register">Sign Up</Link>
                  </li>
                </div>
              </>
            )}
          </div>
          <div className="cart">
            <Link to="/shopping-cart">
              <FaIcons.FaCartPlus />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
