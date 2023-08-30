import axios, { AxiosInstance } from "axios";

const url = "http://localhost:3000/";

const api: AxiosInstance = axios.create({
  baseURL: url,
});

export default api;
