import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tourPackageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tourPackages",
      required: true,
    },
    quantity: { type: Number, required: true },
    travelers: [
      {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: {
          type: String,
          enum: ["Male", "Female", "Other"],
          required: true,
        },
      },
    ],
    totalPrice: { type: Number, required: true }, // Price before Razorpay fees
    razorpayFee: { type: Number },               // Razorpay fee (e.g., 2% of totalPrice)
    gst: { type: Number },                       // GST on Razorpay fee
    totalPayable: { type: Number },              // totalPrice + razorpayFee + gst

    currency: { type: String, default: "INR" },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Confirmed", "Cancelled"],
      default: "Processing",
    },

    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },

    tourPackageSnapshot: {
      title: String,
      pricePerPerson: Number,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
