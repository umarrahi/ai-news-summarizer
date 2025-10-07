// server/src/config/nodemailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com", // Gmail default
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // your app password
  },
});

// ✅ Optional: verify connection (useful for debugging)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter connection failed:", error);
  } else {
    console.log("✅ Email transporter connected successfully");
  }
});

export default transporter;
