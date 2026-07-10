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

export default api;
