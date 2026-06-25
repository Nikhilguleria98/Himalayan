import express from "express"
import {createOrder,capturePayment,getAllOrdersByUser,getOrderDetails} from "../../controllers/client/order-controller.js"

const router = express.Router()

router.post("/create", createOrder);

router.post("/capture", capturePayment);

router.get("/user/:userId", getAllOrdersByUser);

router.get("/:id", getOrderDetails);

export default router