import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { FormControlLabel, Typography } from "@material-ui/core";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../Services/apiClient";
import Button from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/styles";
import { Block } from "@material-ui/icons";
import Radio from "@material-ui/core/Radio";
import { RadioGroup } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import NotAllowed from "../NotAllowed/NotAllowed";
import "./MoviePostForm.css";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBotttom: 20,
    display: Block,
  },
});

export default function MoviePost({
  user,
  genre,
  movieName,
  moviePoster,
  movieId,
}) {
  const classes = useStyles();
  let Navigate = useNavigate();
  const [category, setCategory] = useState("todos");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: "",
    text: "",
  });

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setTextError(false);

    if (title === "") {
      setTitleError(true);
    }

    if (text === "") {
      setTextError(true);
    }

    const { data, error } = await apiClient.createPost({
      title: title,
      text: text,
      genre: genre,
      movieName: movieName,
      moviePoster: moviePoster,
      movieId: movieId,
    });
    if (data) {
      // setForm({ title: "", text: "" });
      // Navigate(`/genre/${genre}`)
      Navigate(-1); //goes back one to the movie detail page
    }
    if (error) {
      setError(error);
    }
  };

  if (!user) {
    return <NotAllowed movieId={movieId} genre={genre} />;
  }
  return (
    <div className="test">
      <Container>
        <div className="header">
          <Typography variant="h6" color="textSecondary" component="h2">
            Create a new post in {genre}
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
          {/* <div className="dunno">
            {test.map((item) => {
              console.log(item);
              <FormControlLabel
                value={item}
                control={<Radio />}
                label={item}
              />;
            })}
          </div>
          <FormControl className={classes.field}>
            <FormLabel>Note Category</FormLabel>
            <RadioGroup
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <FormControlLabel
                value="money"
                control={<Radio />}
                label="Money"
              />
              <FormControlLabel
                value="todos"
                control={<Radio />}
                label="todos"
              />
            </RadioGroup>
          </FormControl> */}
          <div className="center">
            <Button
              // onClick={() => console.log("you clikced me")}
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}
            >
              Submit
            </Button>
          </div>
        </form>
      </Container>
      <div className="NewPostForm">
        <div className="card">
          {/* <h2>Create a new post in {genre} forum</h2> */}

          {Boolean(error) && <span className="error">{error}</span>}

          {/* {renderForm()} */}
        </div>
      </div>
    </div>
  );
  // const renderForm = () => {
  // if (!user?.email) {
  //   return <NotAllowed />
  // }
  // return (
  //   <div className="form">
  //     <div className="input-field">
  //       <label htmlFor="title">Title</label>
  //       <input
  //         type="text"
  //         name="title"
  //         placeholder="Enter Title Here"
  //         value={form.title}
  //         onChange={handleOnInputChange}
  //       />
  //     </div>

  //     <div className="input-field">
  //       <label htmlFor="text">Text</label>
  //       <input
  //         type="text"
  //         name="text"
  //         placeholder="Enter Text Here"
  //         value={form.text}
  //         onChange={handleOnInputChange}
  //       />
  //     </div>

  //     <button className="btn" onClick={handleOnSubmit}></button>
  //   </div>
  // );
}

//   return (
//     <div className="NewPostForm">
//       <div className="card">
//         <h2>Create a new post in {genre} forum</h2>
//         {/* <p>Genre: {genreCapitalized}</p> */}

//         {Boolean(error) && <span className="error">{error}</span>}

//         {renderForm()}
//       </div>
//     </div>
//   );
// }
