// server/src/controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter, { sendStyledEmail } from "../config/nodemailer.js";
import User from "../models/user.model.js";

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

    await sendStyledEmail(
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
    user.verificationToken = null;
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
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: "No account found with this email" });

    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });

    user.resetToken = resetToken;
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: '"AI Summarizer" <no-reply@aisummarizer.com>',
      to: email,
      subject: "Reset your password",
      html: `
        <h3>Password Reset Request</h3>
        <p>Click below to reset your password. This link expires in 15 minutes.</p>
        <a href="${resetLink}" target="_blank">Reset Password</a>
      `,
    });

    res.status(200).json({ message: "Password reset link sent to your email." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.resetToken !== token) return res.status(400).json({ message: "Invalid reset token" });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.resetToken = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
