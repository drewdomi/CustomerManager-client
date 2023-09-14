import axios, { AxiosInstance } from "axios";

// const url = "http://localhost:3000/";
const url = "https://drewdomi-cm-api.vercel.app/";

const api: AxiosInstance = axios.create({
  baseURL: url,
});

export default api;
