import nodemailer from "nodemailer";

let transporter;

const getTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error(
      "SMTP is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD to Backend/.env"
    );
  }

  if (!transporter) {
    const port = Number(SMTP_PORT) || 587;
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      requireTLS: port === 587,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  return transporter;
};

export const verifyEmailService = async () => {
  try {
    await getTransporter().verify();
    console.log("✅ Email service ready");
  } catch (error) {
    console.log("Email service error:", error.message);
  }
};

// OTP Email Template
const otpEmailTemplate = (otp, userName, expiryMinutes = 10) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        .header { text-align: center; color: #333; margin-bottom: 20px; }
        .otp-box { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
        .otp { font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; }
        .footer { text-align: center; color: #888; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Email Verification</h1>
        </div>
        
        <p>Hi ${userName},</p>
        
        <p>Thank you for signing up! Please verify your email address using the OTP below:</p>
        
        <div class="otp-box">
          <div class="otp">${otp}</div>
          <p style="color: #666; margin: 10px 0;">Valid for ${expiryMinutes} minutes</p>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          ⚠️ Never share this OTP with anyone. We will never ask for it.
        </p>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Password Reset Template
const passwordResetTemplate = (otp, userName, expiryMinutes = 10) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        .header { text-align: center; color: #333; margin-bottom: 20px; }
        .otp-box { background: #fff3cd; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; border: 1px solid #ffc107; }
        .otp { font-size: 32px; font-weight: bold; color: #856404; letter-spacing: 5px; }
        .footer { text-align: center; color: #888; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        
        <p>Hi ${userName},</p>
        
        <p>We received a request to reset your password. Use the OTP below:</p>
        
        <div class="otp-box">
          <div class="otp">${otp}</div>
          <p style="color: #666; margin: 10px 0;">Valid for ${expiryMinutes} minutes</p>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          If you didn't request this, your account may be at risk. Please change your password immediately.
        </p>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Himalayan Khadu. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send OTP Email
const sendOTPEmail = async (email, otp, type = 'signup', userName = 'User') => {
  try {
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY) || 10;
    
    const template = type === 'password-reset' 
      ? passwordResetTemplate(otp, userName, expiryMinutes)
      : otpEmailTemplate(otp, userName, expiryMinutes);

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: email,
      subject: type === 'password-reset' 
        ? 'Password Reset OTP - Your App'
        : 'Email Verification OTP - Your App',
      html: template,
    };

    const info = await getTransporter().sendMail(mailOptions);
    console.log(`✅ Email sent to ${email}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Send Welcome Email
const sendWelcomeEmail = async (email, userName) => {
  try {
    const template = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
          .header { text-align: center; color: #28a745; margin-bottom: 20px; }
          .footer { text-align: center; color: #888; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Email Verified!</h1>
          </div>
          
          <p>Hi ${userName},</p>
          
          <p>Your email has been successfully verified. Your account is now fully activated.</p>
          
          <p>You can now:</p>
          <ul>
            <li>Book tours and packages</li>
            <li>Access your bookings</li>
            <li>Leave reviews and ratings</li>
            <li>Manage your profile</li>
          </ul>
          
          <p>If you have any questions, feel free to contact us.</p>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Welcome! Your email is verified',
      html: template,
    };

    await getTransporter().sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export { sendOTPEmail, sendWelcomeEmail };