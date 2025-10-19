// server/src/controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { sendPasswordResetEmail, sendVerifyEmail } from "../utils/email.util.js";

// ✅ Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // ✅ Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
    });

    // Send verification email
    const verifyLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    await sendVerifyEmail(
      email,
      "Verify your email",
      `Welcome, ${name}!`,
      "Please verify your email address to activate your account.",
      "Verify Email",
      verifyLink
    );

    return res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      userId: newUser.id,
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Verify Email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check already verified
    if (user.isVerified)
      return res.status(400).json({ message: "Email already verified" });

    // ✅ Update verification info
    user.isVerified = true;
    user.verificationToken = token;
    user.emailVerifiedAt = new Date();
    await user.save();

    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    console.error("Verify Email Error:", err);
    res.status(400).json({ message: "Invalid or expired verification link" });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get current user
export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "isVerified"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "No account found with this email" });

    // 2️⃣ Generate reset token (15 mins expiry)
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // console.log("Reset Token >> ", resetToken)

    // 3️⃣ Save token in DB (optional if using only token validation)
    user.resetToken = resetToken; // Assign the generated token
    await user.save(); // Save the user record to persist the token

    // 4️⃣ Create reset link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // 5️⃣ Send styled email
    await sendPasswordResetEmail(email, resetLink);

    // 6️⃣ Respond success
    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error("❌ Forgot Password Error:", err);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params; // ✅ Gets the token from the URL
    const { password } = req.body; // ✅ Gets the new password from the request body

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Verifies the JWT
    const user = await User.findOne({ where: { email: decoded.email } }); // ✅ Finds user by email from JWT

    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ This check is likely failing
    // if (user.resetToken !== token) return res.status(400).json({ message: "Invalid reset token" });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.resetToken = null; // ✅ Clears the token after use
    await user.save(); // ✅ Saves the user

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (err) {
    // ✅ This catches JWT errors (invalid/expired)
    res.status(400).json({ message: "Invalid or expired token" });
  }
};