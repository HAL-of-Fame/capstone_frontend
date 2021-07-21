import { useState } from "react"
// import axios from "axios"
import apiClient from "../Services/apiClient"
// import NotAllowed from "../NotAllowed/NotAllowed"
import "./PostForm.css"
 
 
export default function NewPost({ user, addPost }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    title: "",
    text: "",
  })
 
  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }
 
  const handleOnSubmit = async () => {
    setIsLoading(true)
 
    const { data, error } = await apiClient.createNewPost({ title: form.title, text: form.text })
    if (data) {
      addPost(data.post)
      setForm({ title: "", text: "" })
    }
    if (error) {
      setError(error)
    }
 
    setIsLoading(false)
  }
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

        <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
          {isLoading ? "Loading..." : "Post"}
        </button>
      </div>
    )
  }
 
  return (
    <div className="NewPostForm">
      <div className="card">
        <h2>Create a new post</h2>
 
        {Boolean(error) && <span className="error">{error}</span>}
 
        {renderForm()}
      </div>
    </div>
  )
}
