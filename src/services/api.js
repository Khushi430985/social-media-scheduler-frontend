import axios from "axios";

const api = axios.create({
  baseURL: "https://social-media-scheduler-backend.onrender.com/",
});

export default api;