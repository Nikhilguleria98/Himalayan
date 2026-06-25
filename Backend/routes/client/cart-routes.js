import express from "express"
import {addToCart,fetchCartItems,updateCartItems,deleteCartItems} from "../../controllers/client/cart-controller.js"

const router = express.Router()

router.post("/add",addToCart);

router.get("/get/:userId",fetchCartItems);

router.put("/update",updateCartItems);

router.delete("/delete",deleteCartItems);

export default router