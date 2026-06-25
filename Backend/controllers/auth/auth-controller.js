import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

/* ─── helpers ─── */
const createToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role, email: user.email, userName: user.userName, phone: user.phone },
    process.env.JWT_SECRET || "CLIENT_SECRET_KEY",
    { expiresIn: "60m" }
  );


/* ─── Register ─── */
export const registerUser = async (req, res) => {
  const { userName, email, password, phone } = req.body;
  try {
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    const checkUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (checkUser) {
      const field = checkUser.email === email ? "email" : "username";
      return res.status(409).json({
        success: false,
        message: `User already exists with the same ${field}. Please try again`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      phone: phone || "",
      role: "user",
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration successful",
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
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

/* ─── User Login – direct JWT, NO OTP ─── */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({ success: false, message: "User doesn't exist. Please register first" });
    }
    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect Password! Please try again" });
    }
    if (checkUser.role !== "user") {
      return res.status(403).json({ success: false, message: "Please use Admin Login for this account" });
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

/* ─── Admin Login – direct JWT, NO OTP ─── */
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({ success: false, message: "User doesn't exist. Please register first" });
    }
    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect Password! Please try again" });
    }
    if (checkUser.role !== "admin") {
      return res.status(403).json({ success: false, message: "This account is not an admin account" });
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


/* ─── Logout ─── */
export const logoutUser = (req, res) => {
  res.clearCookie("token").json({ success: true, message: "Logged Out Successfully" });
};

/* ─── Update Profile ─── */
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

/* ─── Auth Middleware ─── */
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
