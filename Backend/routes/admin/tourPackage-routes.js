import express from "express"
import {addTourPackage,getTourPackage,editTourPackage,deleteTourPackageById,upload,uploadFields,uploadTourPackageImage} from "../../controllers/admin/tourPackage-controller.js"
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

router.post("/add", authMiddleware, requireAdmin, uploadFields, addTourPackage);

router.post("/upload-image", authMiddleware, requireAdmin, upload.single("file"), uploadTourPackageImage);

router.get("/get/", getTourPackage);

router.put("/edit/:id", authMiddleware, requireAdmin, editTourPackage);

router.delete("/delete/:id", authMiddleware, requireAdmin, deleteTourPackageById);

export default router
