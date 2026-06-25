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
      phone: user.phone,
      userName: user.userName,
    },
    process.env.JWT_SECRET || "CLIENT_SECRET_KEY",
    { expiresIn: "60m" }
  );

// register controller
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

  await sendOTPEmail(email, otp, "signup", userName);
};

export const registerUser = async (req, res) => {
  const { userName, email, password, phone } = req.body;
  try {
    if (!userName || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "Username, email, phone and password are required",
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      if (!existingEmail.isVerified) {
        await sendSignupOTP(email, existingEmail.userName);
        return res.status(200).json({
          success: true,
          message: "OTP resent. Please verify your email.",
          email,
        });
      }

      return res.status(409).json({
        success: false,
        message: "User already exists with the same email. Please try again",
      });
    }

    const checkUser = await User.findOne({ $or: [{ userName }, { phone }] });
    if (checkUser) {
      const field = checkUser.userName === userName ? "username" : "phone";
      return res.status(409).json({
        success: false,
        message: `User already exists with the same ${field}. Please try again`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      phone,
      password: hashPassword,
      role: "user",
      isVerified: false,
    });
    await newUser.save();

    await sendSignupOTP(email, userName);

    res.status(200).json({
      success: true,
      message: "Registration successful. Please verify your email with the OTP sent.",
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
        message: "Account created but OTP email could not be sent. Use resend OTP on the verify page.",
        email,
      });
    }

    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const handleLogin = async (req, res, loginAs) => {
  const { email, password } = req.body; // form se data lena
  try {
    if (!["user", "admin"].includes(loginAs)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid login type",
      });
    }

    const checkUser = await User.findOne({ email }); //database mein data compare karna
    // Agar user exist nhi karta hai to ye message dikhao
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exists Please register first",
      });
    }
    // agar user exist karta hai but uska password galat hai to ye meassage dikhao
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password! Please try again",
      });
    }

    if (!checkUser.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in",
        needsVerification: true,
        email: checkUser.email,
      });
    }

    if (checkUser.role !== loginAs) {
      return res.status(403).json({
        success: false,
        message:
          loginAs === "admin"
            ? "This account is not an admin account"
            : "Please use Admin Login for this account",
      });
    }

    // ab hamari credentials bilkul shi hai to hum token create karege
    const token = createToken(checkUser); // token gets expires in 60 minutes
    

    //   @#$% live cookie setup k liye  @#$%
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// login controller
export const loginUser = async (req, res) => {
  return handleLogin(req, res, "user");
};

export const loginAdmin = async (req, res) => {
  return handleLogin(req, res, "admin");
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

// logout
export const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged Out Successfully",
  });
};

// auth middleware for live token
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};
