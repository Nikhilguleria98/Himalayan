import Order from "../../models/order.js"
import User from "../../models/User.js"

const populateOrder = (query) =>
  query
    .populate("userId", "userName email role createdAt")
    .populate("tourPackageId", "title price salePrice duration gallery");

export const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await populateOrder(Order.find({}).sort({ createdAt: -1 }));

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.error("Error fetching all orders:", e);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching orders.",
    });
  }
};

export const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await populateOrder(Order.findById(id));
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
    console.error("Error fetching order details:", e);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the order details.",
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const validStatuses = ["Processing", "Confirmed", "Cancelled"];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid orderStatus. Allowed values: ${validStatuses.join(", ")}`,
      });
    }
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }
    order.orderStatus = orderStatus;
    await order.save();
    res.status(200).json({
      success: true,
      message: "Order status updated successfully!",
      data: order,
      updatedStatus: order.orderStatus,
    });
  } catch (e) {
    console.error("Error updating order status:", e);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the order status.",
    });
  }
};

export const getAllUsersForAdmin = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    const orders = await populateOrder(Order.find({}).sort({ createdAt: -1 })).lean();
    const ordersByUser = orders.reduce((acc, order) => {
      const userId = order.userId?._id?.toString() || order.userId?.toString();
      if (!userId) return acc;
      acc[userId] = acc[userId] || [];
      acc[userId].push(order);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: users.map((user) => ({
        ...user,
        orders: ordersByUser[user._id.toString()] || [],
      })),
    });
  } catch (e) {
    console.error("Error fetching users:", e);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching users.",
    });
  }
};

export const getUserDetailForAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password").lean();
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const orders = await populateOrder(
      Order.find({ userId }).sort({ createdAt: -1 })
    ).lean();

    res.status(200).json({
      success: true,
      data: { ...user, orders },
    });
  } catch (e) {
    console.error("Error fetching user detail:", e);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching user detail.",
    });
  }
};

