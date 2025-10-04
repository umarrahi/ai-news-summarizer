// src/services/api/auth.ts
import api from "../axios";

export const register = async (data: { name: string; email: string; password: string }) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};
