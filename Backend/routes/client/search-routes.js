import express from "express"
import {searchTourPackages} from "../../controllers/client/search-controller.js"

const router = express.Router()

router.get("/search/:keyword",searchTourPackages);

export default router