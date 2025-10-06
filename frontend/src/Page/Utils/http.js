import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

export const http = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: true, // 쿠키 쓰면 활성화
  // timeout: 10000,
});
