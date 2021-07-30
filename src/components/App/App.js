import './App.css';
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
import data from "../../data";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Orders from "../Orders/Orders";
import axios from "axios";
import PostDetail from "../PostDetail/PostDetail";
import Genres from "../Genres/Genres";
import MoviePost from "../MoviePostForm/MoviePostForm";

export default function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [trending, setTrending] = useState([]);
  const [genre, setGenre] = useState("");
  const [movieName, setMovieName] = useState("");

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleOnCheckout = async () => {
    setIsCheckingOut(true);
    console.log(cartItems);
    console.log(user);
    try {
      const res = await apiClient.createOrder(cartItems, user);
      console.log(res);
      if (res?.data?.order) {
        setOrders((o) => [...res.data.order, ...o]);
        setIsCheckingOut(false);
        setCartItems([]);
        return res.data.order;
      } else {
        setError("Error checking out.");
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setError(message ?? String(err));
    } finally {
      setIsCheckingOut(false);
    }
  };
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

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

  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true);

      try {
        const res = await axios.get("http://localhost:3001/store");
        console.log(res);
        if (res?.data?.products) {
          setProducts(res.data.products);
        } else {
          setError("Error fetching products.");
        }
      } catch (err) {
        console.log(err);
        const message = err?.response?.data?.error?.message;
        setError(message ?? String(err));
      } finally {
        setIsFetching(false);
      }
    };
    fetchProducts();
  }, []);

  const addPost = (newPost) => {
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
    setOrders([]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} handleLogout={handleLogout} />
        {/* <Sidebar /> */}
        <Routes>
          <Route
            path="/"
            element={
              <Home user={user} trending={trending} setTrending={setTrending} />
            }
          />
          <GenrePage path="/genre" />
          <Route
            path="/movie/:movie_id"
            element={<IndividualMoviePage user={user} genre={genre} setGenre={setGenre} movieName={movieName} setMovieName={setMovieName} onAdd={onAdd} />}
          />
          {/* <Route path="/movie/:movie_id/create" element={<MoviePost/>} /> */}
          <Route path="*" element={<NotFound user={user} error={error} />} />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/register"
            element={<Signup user={user} setUser={setUser} />}
          />
          <Route
            path="/shopping-cart"
            element={
              <ShoppingCart
                cartItems={cartItems}
                handleOnCheckout={handleOnCheckout}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <Orders
                user={user}
                error={error}
                orders={orders}
                setUser={setUser}
                products={products}
                isFetching={isFetching}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchInputValue={searchInputValue}
                handleOnSearchInputChange={handleOnSearchInputChange}
              />
            }
          />
          <Route path="/search/:searchInputValue" element={<SearchPage />} />
          <Route path="/genre" element={<GenrePage />} />
          <Route path="/genre/:genres" element={<Genres />} />
          <Route
            path="/genre/:genres/create"
            element={<PostForm user={user} posts={posts} addPost={addPost} />}
          />
          <Route path="/movie/:postId/create" element={<MoviePost genre={genre} movieName={movieName} />} />

          <Route
            path="/posts/:postId"
            element={<PostDetail user={user} updatePost={updatePost} />}
          />
          <Route
            path="/store"
            element={<MerchStore products={products} onAdd={onAdd} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
