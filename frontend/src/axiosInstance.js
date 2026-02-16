import axios from "axios";

export const bookBaseUrl = axios.create({
  baseURL: "https://bookstore-backend-zo61.onrender.com/book/",
});
