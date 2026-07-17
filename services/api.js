import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:6500",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("TOKEN:", Cookies.get("accessToken"));
  console.log("AUTH:", config.headers.Authorization);

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 500) {
      window.location.href = "/500";
    }

    if (!error.response) {
      window.location.href = "/500";
    }

    return Promise.reject(error);
  },
);
export default api;
