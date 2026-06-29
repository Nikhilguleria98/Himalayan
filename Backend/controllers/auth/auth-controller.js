import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import EmailOTP from "../../models/emailOTP.js";
import { generateOTP, getOTPExpiry, isOTPExpired } from "../../helpers/otpGenerator.js";
import { sendOTPEmail, sendWelcomeEmail } from "../../helpers/sendEmail.js";

const createToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
      userName: user.userName,
      phone: user.phone,
    },
    process.env.JWT_SECRET || "CLIENT_SECRET_KEY",
    { expiresIn: "60m" }
  );

const sendSignupOTP = async (email, userName) => {
  const expiryMinutes = parseInt(process.env.OTP_EXPIRY) || 10;
  const otp = generateOTP();

  await EmailOTP.deleteMany({ email, type: "signup", isUsed: false });
  await EmailOTP.create({
    email,
    otp,
    type: "signup",
    expiresAt: getOTPExpiry(expiryMinutes),
  });

  // EMAIL VERIFICATION DISABLED
  // await sendOTPEmail(email, otp, "signup", userName);
};

export const registerUser = async (req, res) => {
  const { userName, email, password, phone } = req.body;
  try {
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      // EMAIL VERIFICATION DISABLED
      // if (!existingEmail.isVerified) {
      //   await sendSignupOTP(email, existingEmail.userName);
      //   return res.status(200).json({
      //     success: true,
      //     message: "OTP resent. Please verify your email.",
      //     email,
      //   });
      // }

      return res.status(409).json({
        success: false,
        message: "User already exists with the same email. Please try again",
      });
    }

    const checkUser = await User.findOne({ userName });
    if (checkUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with the same username. Please try again",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      phone: phone || "",
      role: "user",
      isVerified: true, // EMAIL VERIFICATION DISABLED - Directly verified
    });
    await newUser.save();

    // EMAIL VERIFICATION DISABLED
    // await sendSignupOTP(email, userName);

    res.status(200).json({
      success: true,
      message: "Registration successful. You can now log in.",
      email,
    });
  } catch (e) {
    console.log(e);
    if (e.code === 11000) {
      const field = Object.keys(e.keyPattern || {})[0] || "details";
      return res.status(409).json({
        success: false,
        message: `User already exists with the same ${field}. Please try again`,
      });
    }

    if (e.message?.includes("Failed to send email")) {
      return res.status(500).json({
        success: false,
        message: "Account created successfully.",
        email,
      });
    }

    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist. Please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password! Please try again",
      });
    }

    // EMAIL VERIFICATION DISABLED
    // if (!checkUser.isVerified) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Please verify your email before logging in",
    //     needsVerification: true,
    //     email: checkUser.email,
    //   });
    // }

    if (checkUser.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Please use Admin Login for this account",
      });
    }

    const token = createToken(checkUser);
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
        phone: checkUser.phone,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist. Please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password! Please try again",
      });
    }

    if (checkUser.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "This account is not an admin account",
      });
    }

    const token = createToken(checkUser);
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
        phone: checkUser.phone,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

export const resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    await sendSignupOTP(email, user.userName);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: e.message?.includes("Failed to send email")
        ? "Could not send OTP email. Check SMTP settings."
        : "Some error occurred",
    });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(200).json({
        success: true,
        message: "Email is already verified",
      });
    }

    const otpRecord = await EmailOTP.findOne({
      email,
      type: "signup",
      isUsed: false,
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please register again",
      });
    }

    if (isOTPExpired(otpRecord.expiresAt)) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please register again",
      });
    }

    if (otpRecord.attempts >= otpRecord.maxAttempts) {
      return res.status(400).json({
        success: false,
        message: "Maximum OTP attempts exceeded. Please register again",
      });
    }

    if (otpRecord.otp !== otp) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again",
      });
    }

    otpRecord.isUsed = true;
    await otpRecord.save();

    user.isVerified = true;
    await user.save({ validateBeforeSave: false });

    await sendWelcomeEmail(email, user.userName);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token").json({ success: true, message: "Logged Out Successfully" });
};

export const updateProfile = async (req, res) => {
  try {
    const { userName, email, phone } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.userName = userName;
    user.email = email;
    user.phone = phone || "";
    await user.save();
    res.status(200).json({ success: true, message: "Profile Updated", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized user!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized user!" });
  }
};
