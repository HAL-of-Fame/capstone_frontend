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
  // button: {
  //   justifyContent: "flex-end",

  // },
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

    setTitleError(false);
    setTextError(false);

    const { data, error } = await apiClient.createPost({
      title: title,
      text: text,
      genre: genre,
    });
    if (data) {
      console.log(data);
      Navigate(`/genre/${genre}`);
    }
    if (error) {
      setError(error);
    }
  };

  if (!user) {
    return <NotAllowed />;
  }
  return (
    <div className="test">
      <Container>
        <div className="header">
          <Typography variant="h6" color="textSecondary" component="h2">
            Create a new post in {genreCapitalized}
          </Typography>
        </div>

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
          <div className="center">
            <Button
              // onClick={() => console.log("you clikced me")}
              type="submit"
              color="primary"
              variant="contained"
              // className={classes.button}
              endIcon={<KeyboardArrowRightIcon />}
            >
              Submit
            </Button>
          </div>
        </form>
      </Container>
      <div className="NewPostForm">
        <div className="card">
          <p></p>

          {Boolean(error) && <span className="error">{error}</span>}

          {/* {renderForm()} */}
        </div>
      </div>
    </div>
  );
}
