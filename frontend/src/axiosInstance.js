import axios from "axios";

export const bookBaseUrl = axios.create({
  baseURL: "http://localhost:8000/book/",
});
