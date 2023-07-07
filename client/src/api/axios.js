import axios from "axios";
import { URL_BASE_API } from "../config.js";

const myAxios = axios.create({
  baseURL: URL_BASE_API,
  withCredentials: true,
});

myAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default myAxios;
