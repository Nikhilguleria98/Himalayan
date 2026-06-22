import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRouter from './routes/auth/auth-routes.js'

import adminTourPackageRouter from './routes/admin/tourPackage-routes.js'
import adminOrderRouter from './routes/admin/order-routes.js'

import clientCartRouter from './routes/client/cart-routes.js'
import clientOrderRouter from './routes/client/order-routes.js'
import clientReviewRouter from './routes/client/review-routes.js'
import clientSearchRouter from './routes/client/search-routes.js'
import clientTourPackageRouter from './routes/client/tourPackage-routes.js'
import { seedAdminUser } from "./helpers/seedAdmin.js"

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await seedAdminUser();
  })
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  process.env.CLIENT_BASE_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

const isLocalViteOrigin = (origin) =>
  /^http:\/\/(localhost|127\.0\.0\.1):517\d$/.test(origin);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || isLocalViteOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use("/api/auth", authRouter);

app.use("/api/admin/package",adminTourPackageRouter);
app.use("/api/admin/order",adminOrderRouter);

app.use("/api/client/cart",clientCartRouter);
app.use("/api/client/orders",clientOrderRouter);
app.use("/api/client/review",clientReviewRouter);
app.use("/api/client/search",clientSearchRouter);
app.use("/api/client/package",clientTourPackageRouter);

app.listen(PORT, () => console.log(`Server is now running on port : ${PORT}`));

app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.message);
  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
});
