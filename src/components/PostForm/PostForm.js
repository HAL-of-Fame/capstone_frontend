import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../Services/apiClient";
// import NotAllowed from "../NotAllowed/NotAllowed"
import "./PostForm.css";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Block } from "@material-ui/icons";
import NotAllowed from "../NotAllowed/NotAllowed";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// console.log(capitalizeFirstLetter('foo')); // Foo

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBotttom: 20,
    display: Block,
  },
});

export default function NewPost({ user }) {
  const classes = useStyles();
  const { genres } = useParams();
  const genreCapitalized = capitalizeFirstLetter(genres);
  let genre = genres;

  let Navigate = useNavigate();
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [textError, setTextError] = useState(false);
  // const [form, setForm] = useState({
  //   title: "",
  //   text: "",
  // });

  // const handleOnInputChange = (event) => {
  //   setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  // };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // console.log(title);
    // console.log(text);
    setTitleError(false);
    setTextError(false);

    // if (title === "") {
    //   console.log("title is blank");
    //   setTitleError(true);
    // }

    // if (text === "") {
    //   setTextError(true);
    //   console.log("text is blank");
    // }

    const { data, error } = await apiClient.createPost({
      // title: form.title,
      // text: form.text,
      title: title,
      text: text,
      genre: genre,
    });
    if (data) {
      console.log(data);

      // setForm({ title: "", text: "" });
      Navigate(`/genre/${genre}`);
    }
    if (error) {
      setError(error);
    }
  };
  // const handleOnSubmit = async (e) => {
  //   e.preventDefault();
  //   const { data, error } = await apiClient.createPost({
  //     title: form.title,
  //     text: form.text,
  //     genre: genre,
  //   });
  //   if (data) {
  //     console.log(data);

  //     setForm({ title: "", text: "" });
  //     Navigate(`/genre/${genre}`);
  //   }
  //   if (error) {
  //     setError(error);
  //   }
  // };

  // const renderForm = () => {
  // if (!user?.email) {
  //   return <NotAllowed />
  // }
  //   return (
  //     <div className="form">
  //       <div className="input-field">
  //         <label htmlFor="title">Title</label>
  //         <input
  //           type="text"
  //           name="title"
  //           placeholder="Enter Title Here"
  //           value={form.title}
  //           onChange={handleOnInputChange}
  //         />
  //       </div>

  //       <div className="input-field">
  //         <label htmlFor="text">Text</label>
  //         <input
  //           type="text"
  //           name="text"
  //           placeholder="Enter Text Here"
  //           value={form.text}
  //           onChange={handleOnInputChange}
  //         />
  //       </div>

  //       <button className="btn" onClick={handleOnSubmit}></button>
  //     </div>
  //   );
  // };
  if (!user) {
    return <NotAllowed />;
  }
  return (
    <div className="test">
      <Container>
        <Typography
          variant="h6"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Create a new post in {genreCapitalized}
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleOnSubmit}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            className={classes.field}
            label="Title"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            error={titleError}
          />

          <TextField
            onChange={(e) => setText(e.target.value)}
            className={classes.field}
            label="Text"
            variant="outlined"
            color="secondary"
            multiline
            rows={4}
            fullWidth
            required
            error={textError}
          />

          <Button
            onClick={() => console.log("you clikced me")}
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
        </form>
      </Container>
      <div className="NewPostForm">
        <div className="card">
          {/* <h2>Create a new post</h2> */}
          {/* <p>Genre: {genreCapitalized}</p> */}
          <p></p>

          {Boolean(error) && <span className="error">{error}</span>}

          {/* {renderForm()} */}
        </div>
      </div>
    </div>
  );
}
