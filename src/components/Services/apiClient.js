import axios from "axios";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "movie_review_token";
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  async request({ endpoint, method = "GET", data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const res = await axios({ url, method, data, headers });
      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  // LOGIN STUFF-----------------------------------
  //helps with keeping the token persistent
  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` });
  }

  async loginUser(credentials) {
    return await this.request({
      endpoint: `auth/login`,
      method: `POST`,
      data: credentials,
    });
  }

  async signUpUser(credentials) {
    return await this.request({
      endpoint: `auth/register`,
      method: `POST`,
      data: credentials,
    });
  }

  async logoutUser() {
    this.setToken(null);
    localStorage.setItem(this.tokenName, "");
  }

  // PRODUCT API CALLS
  async listProducts() {
    return await this.request({ endpoint: `store`, method: `GET` });
  }

  //Create Order
  async createOrder(order, user) {
    return await this.request({
      endpoint: `orders`,
      method: `POST`,
      data: { order, user },
    });
  }
  async OrdersList() {
    return await this.request({
      endpoint: `orders`,
      method: `GET`,
    });
  }

  // GENRES
  async fetchAllPostsByGenre(genre) {
    return await this.request({
      endpoint: `genre/${genre}/`,
      method: `GET`,
    });
  }

  //POST API calls
  async listAllPosts() {
    return await this.request({
      endpoint: `posts`,
      method: `GET`,
    });
  }

  async listMoviePosts(movieName) {
    return await this.request({
      endpoint: `posts/movieposts/${movieName}`,
      method: `GET`,
    });
  }

  async createPost(post) {
    return await this.request({
      endpoint: `posts`,
      method: `POST`,
      data: post,
    });
  }

  async fetchPostById(postId) {
    return await this.request({
      endpoint: `posts/${postId}/`,
      method: `GET`,
    });
  }

  async deletePostById({ postId }) {
    return await this.request({
      endpoint: `posts/${postId}/`,
      method: `DELETE`,
    });
  }

  async updatePost({ postId, postUpdate }) {
    return await this.request({
      endpoint: `posts/${postId}/`,
      method: `PATCH`,
      data: postUpdate,
    });
  }

  // COMMENTS
  //get all comments under that postID
  async listAllComments(postId) {
    return await this.request({
      endpoint: `comments/${postId}/`,
      method: `GET`,
    });
  }

  async createComment(comment, postId) {
    return await this.request({
      endpoint: `comments/${postId}/`,
      method: `POST`,
      data: { comment },
    });
  }

  async fetchCommentById(commentId) {
    return await this.request({
      endpoint: `comments/${commentId}/detail`,
      method: `GET`,
    });
  }

  async deleteCommentById({ commentId }) {
    return await this.request({
      endpoint: `comments/${commentId}/delete`,
      method: `DELETE`,
    });
  }

  async updateComment({ commentId, commentUpdate }) {
    return await this.request({
      endpoint: `comments/${commentId}/edit`,
      method: `PATCH`,
      data: commentUpdate,
    });
  }

  // RATINGS
  // async createRatingForPost({ postId, rating }) {
  //   return await this.request({
  //     endpoint: `posts/${postId}/ratings`,
  //     method: `POST`,
  //     data: { rating },
  //   });
  // }
}
export default new ApiClient(
  process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001"
);
