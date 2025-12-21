import axios from "axios";

const API = axios.create({
  baseURL: "https://book-courier-server-hazel.vercel.app", 
});

API.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
