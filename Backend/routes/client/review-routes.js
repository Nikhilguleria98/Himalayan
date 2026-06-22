import express from "express"
import {addProductReview,getProductReviews} from "../../controllers/client/review-controller.js"

const router = express.Router()

router.post("/add",addProductReview);

router.get("/:tourPackageId",getProductReviews);

export default router