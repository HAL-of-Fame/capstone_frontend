// import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
import GenrePage from "../GenrePage/GenrePage";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import IndividualMoviePage from "../IndividualMoviePage/IndividualMoviePage";
import apiClient from "../Services/apiClient";
import SearchPage from "../SearchPage/SearchPage";
import MerchStore from "../MerchStore/MerchStore";
import PostForm from "../PostForm/PostForm";
import ActionPage from "../ActionPage/ActionPage";
import HorrorPage from "../HorrorPage/HorrorPage";
import ComedyPage from "../ComedyPage/ComedyPage";
import DramaPage from "../DramaPage/DramaPage";
import ScienceFictionPage from "../ScienceFictionPage/ScienceFictionPage";
import RomancePage from "../RomancePage/RomancePage";

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [posts, setPosts] = useState([]);

  // const handleOnSearchInputChange = (event) => {
  //   setSearchInputValue(event.target.value)
  // }

  // const handleOnCheckout = async () => {
  //   setIsCheckingOut(true)
  // }

  useEffect(() => {
    const fetchPosts = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.listProducts();
      if (data) {
        setPosts(data.posts);
      }
      if (error) {
        setError(error);
      }

      setIsFetching(false);
    };

    fetchPosts();
  }, []);

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

  const addPost = (newPost) => {
    // console.log(posts)
    setPosts((oldPosts) => [...oldPosts, newPost]);
  };

  const updatePost = ({ postId, postUpdate }) => {
    setPosts((oldPosts) => {
      return oldPosts.map((post) => {
        if (post.id === Number(postId)) {
          return { ...post, ...postUpdate };
        }
        return post;
      });
    });
  };

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
          <GenrePage path="/genre" />
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
          <Route path="/genre" element={<GenrePage />} />
          <Route path="/genre/action" element={<ActionPage />} />
          <Route path="/genre/comedy" element={<ComedyPage />} />
          <Route path="/genre/romance" element={<RomancePage />} />
          <Route path="/genre/drama" element={<DramaPage />} />
          <Route
            path="/genre/science-fiction"
            element={<ScienceFictionPage />}
          />
          <Route path="/genre/horror" element={<HorrorPage />} />
          <Route
            path="/genre/action/create"
            element={<PostForm user={user} posts={posts} addPost={addPost} />}
          />
          <Route path="/store" element={<MerchStore />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
