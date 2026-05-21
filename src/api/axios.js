import axios from "axios";

const api = axios.create({
  baseURL: (import.meta.env.VITE_SERVER_URL || "http://localhost:4000") + "/api",
});

// attach auth token to all network requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
