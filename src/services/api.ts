import axios, { AxiosInstance } from "axios";

const url = import.meta.env.VITE_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: url,
});

export default api;
