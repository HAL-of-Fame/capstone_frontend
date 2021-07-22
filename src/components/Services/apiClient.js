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

  // async createNewPost(post) {
  //   return await this.request({
  //     endpoint: `genre/create`,
  //     method: "POST",
  //     data: post,
  //   });
  // }

  // PRODUCT API CALLS
  async listProducts() {
    return await this.request({ endpoint: `store`, method: `GET` });
  }

  //POST API calls
  async listAllPosts() {
    return await this.request({
      endpoint: `posts`,
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

  async deletePostById({postId}) {
    console.log('inside apiClient postId', postId)
    return await this.request({
      endpoint: `posts/${postId}/`,
      method: `DELETE`,
    });
  }

  async createRatingForPost({ postId, rating }) {
    return await this.request({
      endpoint: `posts/${postId}/ratings`,
      method: `POST`,
      data: { rating },
    });
  }

  async updatePost({ postId, postUpdate }) {
    return await this.request({
      endpoint: `posts/${postId}/`,
      method: `PATCH`,
      data: postUpdate,
    });
  }
}
export default new ApiClient(
  process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001"
);
