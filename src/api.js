import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // e.g., https://e-commersespa-backend.onrender.com/api
});

// Attach token automatically if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Standard JWT header
  }
  return config;
});

export default api;
