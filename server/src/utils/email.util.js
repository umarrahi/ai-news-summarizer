import transporter from "../config/nodemailer.js";

/**
 * Helper to send styled HTML emails
 * @param {string} to
 * @param {string} subject
 * @param {string} heading
 * @param {string} message
 * @param {string} buttonText
 * @param {string} buttonLink
 */

// Verify email template
export const sendVerifyEmail = async (
  to,
  subject,
  heading,
  message,
  buttonText,
  buttonLink
) => {
  const primaryColor = "#fb923c"; // Orange (hsl(25, 88%, 63%))
  const html = `
    <div style="font-family: 'Inter', Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background: linear-gradient(90deg, ${primaryColor}, #f97316); padding: 20px; color: white; text-align: center;">
          <h2 style="margin: 0; font-size: 22px; letter-spacing: 0.5px;">AI Summarizer</h2>
        </div>

        <!-- Body -->
        <div style="padding: 28px;">
          <h3 style="color: #111827; font-size: 20px; margin-bottom: 12px;">${heading}</h3>
          <p style="color: #374151; font-size: 15px; line-height: 1.6;">${message}</p>

          ${
            buttonLink
              ? `
              <div style="text-align: center; margin-top: 30px;">
                <a href="${buttonLink}" target="_blank"
                  style="
                    display: inline-block;
                    background-color: ${primaryColor};
                    color: white;
                    padding: 12px 22px;
                    border-radius: 30px;
                    text-decoration: none;
                    letter-spacing: 0.3px;
                    transition: background 0.3s ease;">
                  ${buttonText}
                </a>
              </div>
              `
              : ""
          }

          <p style="margin-top: 30px; color: #9ca3af; font-size: 13px; text-align: center; line-height: 1.4;">
            If you didn’t request this, you can safely ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f9fafb; padding: 14px; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb;">
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

// Password reset email template
export const sendPasswordResetEmail = async (email, resetLink) => {
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: hsl(25, 88%, 63%); padding: 16px; color: white; text-align: center;">
          <h2 style="margin: 0;">AI Summarizer</h2>
        </div>

        <!-- Body -->
        <div style="padding: 24px;">
          <h3 style="color: #111827;">Password Reset Request</h3>
          <p style="color: #374151; font-size: 15px;">
            We received a request to reset your password. Click the button below to set a new password. 
            <br><br>This link will expire in <strong>15 minutes</strong>.
          </p>

          <div style="text-align: center; margin-top: 20px;">
            <a href="${resetLink}" target="_blank"
              style="display: inline-block; background-color: hsl(25, 88%, 63%); color: white;
                     padding: 10px 18px; border-radius: 30px; text-decoration: none;
                     font-weight: 500;">
              Reset Password
            </a>
          </div>

          <p style="margin-top: 24px; color: #9ca3af; font-size: 13px; text-align: center;">
            If you didn’t request this, you can safely ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f9fafb; padding: 12px; text-align: center; color: #9ca3af; font-size: 12px;">
          © ${new Date().getFullYear()} AI Summarizer. All rights reserved.
        </div>

      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: '"AI Summarizer" <no-reply@aisummarizer.com>',
      to: email,
      subject: "Reset your password",
      html,
    });
    console.log(`📧 Password reset email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send password reset email:", error);
  }
};
