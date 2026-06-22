import express from "express"
import {getAllOrdersOfAllUsers,getAllUsersForAdmin,getOrderDetailsForAdmin,updateOrderStatus} from "../../controllers/admin/order-controller.js"
import { authMiddleware } from "../../controllers/auth/auth-controller.js"


const router = express.Router()

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

router.get("/get", authMiddleware, requireAdmin, getAllOrdersOfAllUsers);

router.post("/get", authMiddleware, requireAdmin, getAllOrdersOfAllUsers);

router.get("/users", authMiddleware, requireAdmin, getAllUsersForAdmin);

router.get("/get/:id", authMiddleware, requireAdmin, getOrderDetailsForAdmin);

router.put("/update/:id", authMiddleware, requireAdmin, updateOrderStatus);

export default router
