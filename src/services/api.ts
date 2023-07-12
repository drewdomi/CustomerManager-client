import axios, { AxiosInstance } from "axios";

const url = "http://192.168.0.131:3000/customers";

const api: AxiosInstance = axios.create({
  baseURL: url,
});

export default api;
