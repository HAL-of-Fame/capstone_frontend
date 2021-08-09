import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import apiClient from "../Services/apiClient";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Signup({ user, setUser }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    // if user is already logged in,
    // redirect them to the home page
    if (user?.email) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "passwordConfirm") {
      if (event.target.value !== form.password) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Passwords do not match.",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsProcessing(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    const { data, error } = await apiClient.signUpUser({
      email: form.email,
      password: form.password,
      first_name: form.first_name,
      last_name: form.last_name,
      username: form.username,
    });
    if (error) setErrors((e) => ({ ...e, form: error }));

    if (data?.user) {
      setUser(data.user);
      apiClient.setToken(data.token);
    }
  };

  return (
    <div className="Signup">
      <div className="card">
        <h2>Create Account</h2>

        {errors.form && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
          <div className="names">
            <div className="input-field">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                name="first_name"
                placeholder="Enter your first name"
                value={form.first_name}
                onChange={handleOnInputChange}
              />
              {errors.first_name && (
                <span className="error">{errors.first_name}</span>
              )}
            </div>

            <div className="input-field">
              <div className="lastn">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Enter your last name"
                  value={form.last_name}
                  onChange={handleOnInputChange}
                />
                {errors.last_name && (
                  <span className="error">{errors.last_name}</span>
                )}
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleOnInputChange}
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter a valid email"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter a secure password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <div className="input-field">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm your password"
              value={form.passwordConfirm}
              onChange={handleOnInputChange}
            />
            {errors.passwordConfirm && (
              <span className="error">{errors.passwordConfirm}</span>
            )}
          </div>
          <div className="footer">
            <Button
              variant="contained"
              color="primary"
              disabled={isProcessing}
              onClick={handleOnSubmit}
            >
              {isProcessing ? "Loading..." : "Create Account"}
            </Button>
          </div>
        </div>

        <div className="footer">
          <p>
            Already have an account? Login <Link to="/login">here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// import React from 'react';
// import { useEffect, useState } from "react";
// import { useNavigate} from "react-router-dom";
// import apiClient from "../Services/apiClient";
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';

// function Copyright({ user, setUser }) {
//   const navigate = useNavigate();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [form, setForm] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     username: "",
//     password: "",
//     passwordConfirm: "",
//   });

//   useEffect(() => {
//     // if user is already logged in,
//     // redirect them to the home page
//     if (user?.email) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   const handleOnInputChange = (event) => {
//     if (event.target.name === "email") {
//       if (event.target.value.indexOf("@") === -1) {
//         setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
//       } else {
//         setErrors((e) => ({ ...e, email: null }));
//       }
//     }

//     if (event.target.name === "passwordConfirm") {
//       if (event.target.value !== form.password) {
//         setErrors((e) => ({
//           ...e,
//           passwordConfirm: "Passwords do not match.",
//         }));
//       } else {
//         setErrors((e) => ({ ...e, passwordConfirm: null }));
//       }
//     }

//     setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
//   };

//   const handleOnSubmit = async () => {
//     setIsProcessing(true);
//     setErrors((e) => ({ ...e, form: null }));

//     if (form.passwordConfirm !== form.password) {
//       setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
//       setIsProcessing(false);
//       return;
//     } else {
//       setErrors((e) => ({ ...e, passwordConfirm: null }));
//     }

//     const { data, error } = await apiClient.signUpUser({
//       email: form.email,
//       password: form.password,
//       first_name: form.first_name,
//       last_name: form.last_name,
//       username: form.username,
//     });
//     if (error) setErrors((e) => ({ ...e, form: error }));

//     if (data?.user) {
//       setUser(data.user);
//       apiClient.setToken(data.token);
//     }
//   };
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         MovieCentral
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function SignUp() {
//   const classes = useStyles();

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <form className={classes.form} noValidate>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
// type="text"
//                 name="first_name"
//                 placeholder="Enter your first name"
//                 value={form.first_name}
//                 onChange={handleOnInputChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="lastName"
//                 label="Last Name"
//                 name="lastName"
//                 autoComplete="lname"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={<Checkbox value="allowExtraEmails" color="primary" />}
//                 label="I want to receive inspiration, marketing promotions and updates via email."
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Sign Up
//           </Button>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link href="#" variant="body2">
//                 Already have an account? Sign in
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <Box mt={5}>
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }
