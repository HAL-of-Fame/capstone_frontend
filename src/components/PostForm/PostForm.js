import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../Services/apiClient";
// import NotAllowed from "../NotAllowed/NotAllowed"
import "./PostForm.css";

export default function NewPost({ user }) {
  // console.log(user)
  let Navigate = useNavigate();
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
    // console.log(form.title);
    // console.log(form.text);

    const { data, error } = await apiClient.createPost({
      title: form.title,
      text: form.text,
    });
    if (data) {
      console.log(data);
      // addPost(data.post);
      setForm({ title: "", text: "" });
      Navigate("/")
    }
    if (error) {
      setError(error);
    }
  };

  const renderForm = () => {
    // if (!user?.email) {
    //   return <NotAllowed />
    // }
    return (
      <div className="form">
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Title Here"
            value={form.title}
            onChange={handleOnInputChange}
          />
        </div>

        <div className="input-field">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            name="text"
            placeholder="Enter Text Here"
            value={form.text}
            onChange={handleOnInputChange}
          />
        </div>

        <button className="btn" onClick={handleOnSubmit}></button>
      </div>
    );
  };

  return (
    <div className="NewPostForm">
      <div className="card">
        <h2>Create a new post</h2>

        {Boolean(error) && <span className="error">{error}</span>}

        {renderForm()}
      </div>
    </div>
  );
}
