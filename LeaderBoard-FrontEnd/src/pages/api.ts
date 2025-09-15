import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api", //backend base URL
  withCredentials: true,
});

// Add interceptor to attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
