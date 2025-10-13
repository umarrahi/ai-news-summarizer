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

/**
 * Helper to send styled HTML emails
 * @param {string} to
 * @param {string} subject
 * @param {string} heading
 * @param {string} message
 * @param {string} buttonText
 * @param {string} buttonLink
 */
export const sendStyledEmail = async (
  to,
  subject,
  heading,
  message,
  buttonText,
  buttonLink
) => {
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(90deg, #6366f1, #8b5cf6); padding: 16px; color: white; text-align: center;">
          <h2 style="margin: 0;">AI Summarizer</h2>
        </div>
           <div style="padding: 24px;">
          <h3 style="color: #111827;">${heading}</h3>
          <p style="color: #374151; font-size: 15px;">${message}</p>
          ${
            buttonLink
              ? `
              <div style="text-align: center; margin-top: 20px;">
                <a href="${buttonLink}" target="_blank" 
                  style="display: inline-block; background-color: #6366f1; color: white;
                         padding: 10px 18px; border-radius: 6px; text-decoration: none;
                         font-weight: 500;">
                  ${buttonText}
                </a>
              </div>
              `
              : ""
          }
          <p style="margin-top: 24px; color: #9ca3af; font-size: 13px; text-align: center;">
            If you didn’t request this, you can safely ignore this email.
          </p>
        </div>
        <div style="background: #f9fafb; padding: 12px; text-align: center; color: #9ca3af; font-size: 12px;">
          © ${new Date().getFullYear()} AI Summarizer. All rights reserved.
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"AI Summarizer" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

export default transporter;
