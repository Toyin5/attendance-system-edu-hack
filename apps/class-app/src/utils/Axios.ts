import axios, { AxiosInstance } from "axios";
const BACKEND_API = import.meta.env.VITE_BACKEND_URL;
const api: AxiosInstance = axios.create({
  baseURL: BACKEND_API,
  timeout: 60000, // Set timeout to 60 seconds
  withCredentials: true,
});

export { api };
