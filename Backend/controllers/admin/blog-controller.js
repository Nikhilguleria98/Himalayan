import Blog from "../../models/blog.js";
import { imageUploadUtil } from "../../helpers/cloudinary.js";

// UPLOAD MULTIPLE IMAGES (call this first; use the returned array as `images`)
export const uploadBlogImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No images provided" });
    }

    const buffers = req.files.map((file) => file.buffer);
    const results = await imageUploadUtil(buffers);

    const images = results.map((r, index) => ({
      url: r.secure_url,
      order: index,
    }));

    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error uploading images" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      content,
      images, // [{ url, order }]
      category,
      tags,
      author,
      featured,
      status,
      seo,
    } = req.body;

    if (
      !title ||
      !shortDescription ||
      !content ||
      !Array.isArray(images) ||
      images.length === 0 ||
      images.some((img) => !img.url) ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message:
          "title, shortDescription, content, at least one image (with url), and category are required",
      });
    }

    const newBlog = new Blog({
      title,
      shortDescription,
      content,
      images,
      category,
      tags: tags || [],
      author,
      featured: featured || false,
      status: status || "Draft",
      seo: seo || {},
    });

    await newBlog.save();

    res.status(201).json({ success: true, message: "Blog created successfully", data: newBlog });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "A blog with this slug already exists" });
    }
    res.status(500).json({ success: false, message: "Error creating blog" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    Object.assign(blog, updateData);
    await blog.save();

    res.status(200).json({ success: true, message: "Blog updated successfully", data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating blog" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting blog" });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category, search } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (search) filter.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);

    const [blogs, totalBlogs] = await Promise.all([
      Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Blog.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: blogs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalBlogs / Number(limit)),
      totalBlogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching blogs" });
  }
};

export const getBlogByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching blog" });
  }
};

export const updateBlogStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Draft", "Published", "Archived"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    blog.status = status;
    await blog.save();

    res.status(200).json({ success: true, message: `Blog marked as ${status}`, data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};

export const updateBlogFeatured = async (req, res) => {
  try {
    const { id } = req.params;
    const { featured } = req.body;

    const blog = await Blog.findByIdAndUpdate(id, { featured: Boolean(featured) }, { new: true });

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({
      success: true,
      message: featured ? "Blog featured" : "Blog unfeatured",
      data: blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating featured flag" });
  }
};