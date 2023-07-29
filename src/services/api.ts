import axios, { AxiosInstance } from "axios";

const url = "https://drewdomi-cm-api.vercel.app/customers/";

const api: AxiosInstance = axios.create({
  baseURL: url,
});

export default api;
