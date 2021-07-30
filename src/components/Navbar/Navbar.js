// import React from 'react';
// import { Link } from "react-router-dom";
// import search from "../../assets/search.svg";
// import "./Navbar.css";
// import * as FaIcons from "react-icons/fa";
// import { useState } from "react";


// export default function Navbar({ user, handleLogout }) {

//   const [searchInputValue, setSearchInputValue] = useState("");

//   const handleOnInputChange = (event) => {
//     console.log(event.target.value);
//     setSearchInputValue(event.target.value);
//   };

//   const clearInput = () =>
// {
//   setSearchInputValue("")
// }
//   return (
//     <nav className="Navbar">
//       <div className="content">
//         <div className="logo">
//           <Link to="/">
//             <img
//               src={require("../../assets/demoLogo.png").default}
//               height={50}
//               width={50}
//               alt="Demo Logo"
//             />
//           </Link>
//         </div>

//         <div className="search-bar-btn">
//           <input
//             className="search-bar"
//             type="text"
//             name="search"
//             placeholder="Search"
//             value={searchInputValue}
//             onChange={handleOnInputChange}
//           />
//           <Link to={`search/${searchInputValue}`} className="search-btn" onClick={clearInput} onChange={handleOnInputChange}>
//             <FaIcons.FaSearch size={45}/>
//           </Link>
//         </div>

//         <Link to={`/`}>
//           <button className="clear" onClick={clearInput}>
//   Clear
// </button>
//           </Link>

//         <div className="links">
//           <div className="auth">
//             {user?.email ? (
//               <>
//                 <li>
//                   <span>{user.email}</span>
//                 </li>
//                 <li>
//                   <button onClick={handleLogout} className="logout">Logout</button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <div className="Loginbut">
//                   <li>
//                     <Link to="/login">Login</Link>
//                   </li>
//                 </div>
//                 <div className="Register">
//                   <li>
//                     <Link to="/register">Sign Up</Link>
//                   </li>
//                 </div>
//               </>
//             )}
//           </div>
//           <div className="cart">
//             <Link to="/shopping-cart">
//               <FaIcons.FaCartPlus />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

import React from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Navbar({ user, handleLogout }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Sidebar/>
          </IconButton>
          
          <Link to={`/`}><Typography variant="h6" className={classes.title}>
            Company Name
          </Typography></Link>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
<div className="buttons">
<Link to="/login"><Button color="inherit">Login</Button></Link>
          <Link to='/register'><Button color="inherit">Register</Button></Link>
          <Link to='/shopping-cart'><Button color="inherit"><FaIcons.FaCartPlus /></Button></Link></div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
