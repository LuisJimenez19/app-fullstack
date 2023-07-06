import axios from "axios";
import { URL_BASE_API } from "../config.js";

const myAxios = axios.create({
  baseURL: URL_BASE_API,
  withCredentials: true,
});

export default myAxios;

