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

export const getMe = async () => {
 const res = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const verifyEmail = async (token: string) => {
  // const res = await api.get(`/auth/verify-email?token=${token}` );
  const res = await api.get(`/auth/verify-email/${token}`);
  return res.data;
}

export const forgotPassword = async (email: string) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (token: string, password: string) => {
  const res = await api.post(`/auth/reset-password/${token}`, { password });
  return res.data;
};
