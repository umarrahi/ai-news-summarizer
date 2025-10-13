// client/src/services/api/profile.ts
import api from "../axios";

// ✅ Fetch user profile
export const getProfile = async () => {
  const res = await api.get("/profile");
  return res.data;
};

// ✅ Update name/email profile
export const updateProfile = async (data: any) => {
  const res = await api.put("/profile", data);
  return res.data;
};

// ✅ Change password
export const changePassword = async (data: { currentPassword: string; newPassword: string }) => {
  const res = await api.put("/profile/change-password", data);
  return res.data;
};
