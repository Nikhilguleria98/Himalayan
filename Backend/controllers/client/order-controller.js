import Order from "../../models/order.js";
import tourPackages from "../../models/tourPackages.js";
import crypto from "crypto";

const RAZORPAY_FEE_PERCENTAGE = 0.02;
const GST_PERCENTAGE = 0.18;

export const createOrder = async (req, res) => {
  try {
    const { userId, tourPackageId, quantity = 1, travelers = [], totalPrice } = req.body;
    const tourPackage = await tourPackages.findById(tourPackageId);

    if (!tourPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found!",
      });
    }

    const pricePerPerson = Number(tourPackage.salePrice || tourPackage.price || 0);
    const calculatedTotal = Number(totalPrice || pricePerPerson * Number(quantity));
    const razorpayFee = calculatedTotal * RAZORPAY_FEE_PERCENTAGE;
    const gst = razorpayFee * GST_PERCENTAGE;
    const totalWithFee = calculatedTotal + razorpayFee + gst;

    const order = await Order.create({
      userId,
      tourPackageId,
      quantity,
      travelers,
      totalPrice: calculatedTotal,
      razorpayFee: razorpayFee.toFixed(2),
      gst: gst.toFixed(2),
      totalPayable: totalWithFee.toFixed(2),
      tourPackageSnapshot: {
        title: tourPackage.title,
        pricePerPerson,
      },
    });

    res.status(201).json({
      success: true,
      message: "Booking request created successfully",
      order,
      totalPayable: totalWithFee.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const capturePayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }

    const order = await Order.findOneAndUpdate(
      { razorpayOrderId },
      {
        razorpayPaymentId,
        razorpaySignature,
        paymentStatus: "Paid",
        orderStatus: "Confirmed",
      },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Payment verified", order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};
