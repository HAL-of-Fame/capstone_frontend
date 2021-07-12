import { Link } from "react-router-dom"
// import logo from "../../assets/demoLogo.png"
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
          <Link to="/">
          <img src={require('../../assets/demoLogo.png').default} height={50} width={50} alt="Demo Logo"/>
          </Link>
        </div>

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
            <div className= "Loginbut">
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
                My Cart
              </Link>
            </div>
            </div>
      </div>
      
    </nav>
  )
}