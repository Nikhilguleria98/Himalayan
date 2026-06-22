import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const createToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
      userName: user.userName,
    },
    process.env.JWT_SECRET || "CLIENT_SECRET_KEY",
    { expiresIn: "60m" }
  );

// register controller
// export like this
export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    const checkUser = await User.findOne({ $or: [{ email }, { userName }] });
    // Agar user already exist karta hai to ye message dikhao
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
