import React, { useState } from "react";
import { makeStyles, alpha } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from "@material-ui/core";
import { Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(5),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar({ user, handleLogout }) {
  const navigate = useNavigate();

  const [searchInputValue, setSearchInputValue] = useState("");
  const clearInput = () => {
    setSearchInputValue("");
  };

  const handleOnInputChange = (event) => {
    console.log(event.target.value);
    setSearchInputValue(event.target.value);
  };

  const handleOnSubmit = (event) => {
    navigate(`search/${searchInputValue}`);
    clearInput();
  };

  const onClickHandler = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();
  const [logged, setLogged] = useState("Login");
  //if user is loggined

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar disableGutters="true">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Sidebar />
          </IconButton>

          <Link to={`/`}>
            <Typography variant="h6" className={classes.title}>
              MovieCentral
            </Typography>
          </Link>

          <div className={classes.search}>
            <form onSubmit={handleOnSubmit}>
              {/* <Button type="submit" className={classes.button}>
                <SearchIcon />
              </Button> */}
              <TextField
                size="small"
                variant="outlined"
                value={searchInputValue}
                onChange={handleOnInputChange}
                placeholder="Search…"
                InputProps={{ endAdornment: <SearchIcon /> }}
              />
            </form>
          </div>

          <div className={classes.buttons}>
            {user?.email ? (
              <>
                <Box>
                  <Button variant="outlined" color="inherit" mx={30}>
                    {/* <Typography style={{ marginRight: 16 }}>{user.email}</Typography> */}
                    {user.email}
                  </Button>

                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleLogout}
                    className="logout"
                  >
                    Logout
                  </Button>
                  <Link to="/shopping-cart">
                    <Button variant="outlined" color="inherit" size="large">
                      <FaIcons.FaCartPlus fontSize="larger" />
                    </Button>
                  </Link>
                </Box>
              </>
            ) : (
              <>
                <Box width="500px" display="flex" justifyContent="space-around">
                  <Button color="inherit" href="/login" variant="outlined">
                    Login
                  </Button>

                  <Button href="/register" color="inherit" variant="outlined">
                    Register
                  </Button>
                  <Link to="/shopping-cart">
                    <Button variant="outlined" color="inherit" size="large">
                      <FaIcons.FaCartPlus fontSize="larger" />
                    </Button>
                  </Link>
                </Box>
              </>
            )}
            {/* <Button
                href="/shopping-cart"
                color="inherit"
                variant="outlined"
                onClick={onClickHandler}
              >
                <FaIcons.FaCartPlus />
              </Button> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
