import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Backend URL
  headers: { "Content-Type": "application/json" }
});

// Request Interceptor (Adds token to headers)
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response, // Pass successful responses
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("token"); 
      window.location.href = "/login";
    }
    return Promise.reject(error); // Pass the error to be handled later
  }
);

export default api;
