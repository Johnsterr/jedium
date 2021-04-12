import axios from "axios";
import API_URL from "@/api/config.js";
import {getItem} from "@/api/token";

axios.defaults.baseURL = API_URL;
axios.interceptors.request.use(config => {
  const token = getItem("accessToken");
  const authorizationToken = token ? `Token ${token}` : "";
  config.headers.Authorization = authorizationToken;
  return config;
});

export default axios;
