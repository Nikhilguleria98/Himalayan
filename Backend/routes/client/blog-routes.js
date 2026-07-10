import express from "express";

import {
  getFeaturedBlogs,
  getAllBlogs,
  getBlogBySlug,
  searchBlogs,
  getBlogsByCategory,
  getRelatedBlogs,
  getPopularBlogs,
} from "../../controllers/client/blog-controller.js";

const router = express.Router();

// Static routes MUST come before "/:slug" or Express will treat
// "featured" / "search" etc. as a slug value.
router.get("/featured", getFeaturedBlogs);
router.get("/search", searchBlogs);
router.get("/category/:category", getBlogsByCategory);
router.get("/related/:slug", getRelatedBlogs);
router.get("/popular", getPopularBlogs);
router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug); // keep last

export default router;