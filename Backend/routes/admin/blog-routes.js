import express from "express";
import { upload } from "../../helpers/cloudinary.js";
import { authMiddleware, isAdmin } from "../../controllers/auth/auth-controller.js";

import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogsAdmin,
  getBlogByIdAdmin,
  updateBlogStatus,
  updateBlogFeatured,
  uploadBlogImages,
} from "../../controllers/admin/blog-controller.js";

const router = express.Router();

router.use(authMiddleware, isAdmin);

router.post("/upload-images", upload, uploadBlogImages);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.get("/", getAllBlogsAdmin);
router.get("/:id", getBlogByIdAdmin);
router.patch("/:id/status", updateBlogStatus);
router.patch("/:id/featured", updateBlogFeatured);

export default router;