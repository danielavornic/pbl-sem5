import axios from "axios";

export const axiosInst = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  withCredentials: true
});
