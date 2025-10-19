// server/src/controllers/profile.controller.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// ✅ Get Logged-in User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "emailVerifiedAt", "createdAt"],
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Logged-in User Profile (name, email only)
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;

    if (email && email !== user.email) {
      // Re-verify email if changed
      user.email = email;
      user.isVerified = false;
      user.emailVerifiedAt = null;
      user.verificationToken = null;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerifiedAt: user.emailVerifiedAt,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Change Password (separate route)
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "Both current and new passwords are required" });

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};