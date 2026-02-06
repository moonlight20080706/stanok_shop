import axios from "axios";

export const BASE_URL = "https://db.techinfo.uz/api"; 
export const BASE_URL_IMG = "https://db.techinfo.uz"; // rasmlar uchun

export const api = axios.create({
  baseURL: BASE_URL,
});

// 🔑 Har bir so‘rovga tokenni avtomatik qo‘shadi
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
