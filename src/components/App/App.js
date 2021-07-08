// import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar"
// import Home from "../Home/Home"

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
          </BrowserRouter>
    </div>
  );
}

export default App;
