import mongoose from "mongoose";

const emailOTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    otp: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["signup", "password-reset", "email-change"],
      default: "signup",
    },
    attempts: {
      type: Number,
      default: 0,
    },
    maxAttempts: {
      type: Number,
      default: 5,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

emailOTPSchema.index({ email: 1, expiresAt: 1 });

const EmailOTP = mongoose.model("EmailOTP", emailOTPSchema);

export default EmailOTP;
