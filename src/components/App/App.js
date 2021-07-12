// import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
// import Home from "../Home/Home";
import IndividualMoviePage from "../IndividualMoviePage/IndividualMoviePage"

function App() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const handleLogout = async () => {
    // await apiClient.logoutUser()
    setUser(null)
    setError(null)
  } 

  return (
      <div className="App">
        <BrowserRouter>
          <Navbar user={user} setUser={setUser} handleLogout={handleLogout} />
          <Routes>
          <Route path="/movie" element={<IndividualMoviePage />} />
          <Route path="*" element={<NotFound user={user} error={error} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/register" element={<Signup user={user} setUser={setUser} />} />
          </Routes>
          </BrowserRouter>        
    </div>
  );
}

export default App;
