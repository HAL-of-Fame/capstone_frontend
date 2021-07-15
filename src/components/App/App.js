// import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
// import Home from "../Home/Home";
import IndividualMoviePage from "../IndividualMoviePage/IndividualMoviePage";
import apiClient from "../Services/apiClient";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import SearchPage from "../SearchPage/SearchPage";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // handles the persistent user token
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      //everytime refresh page, app makes an api request above
      if (data) setUser(data.user);
      if (error) setError(error);
    };
    const token = localStorage.getItem("movie_review_token");
    if (token) {
      apiClient.setToken(token);
      fetchUser();
    }
  }, []);

  // handles the logout
  const handleLogout = async () => {
    await apiClient.logoutUser();
    setUser(null);
    setError(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} handleLogout={handleLogout} />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/movie/:movie_id" element={<IndividualMoviePage />} />
          <Route path="*" element={<NotFound user={user} error={error} />} />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/register"
            element={<Signup user={user} setUser={setUser} />}
          />
          <Route path="/search/:searchInputValue" element={<SearchPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
