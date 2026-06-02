import axios from "axios";

const API = axios.create({
  baseURL: "https://youtube-clone-be44.onrender.com/api",
});

export default API;