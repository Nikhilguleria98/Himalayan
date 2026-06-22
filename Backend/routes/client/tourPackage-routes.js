import express from "express"
import {getFilteredTourPackages,getTourPackageDetails} from "../../controllers/client/tourPackage-controller.js"

const router = express.Router()

router.get('/get',getFilteredTourPackages)
router.get('/get/:id',getTourPackageDetails)

export default router