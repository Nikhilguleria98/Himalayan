import Blog from "../../models/blog.js";

export const getFeaturedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ featured: true, status: "Published" })
      .sort({ publishedAt: -1 })
      .limit(3);

    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching featured blogs" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 8 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const filter = { status: "Published" };

    const [blogs, totalBlogs] = await Promise.all([
      Blog.find(filter).sort({ publishedAt: -1 }).skip(skip).limit(Number(limit)),
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

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOneAndUpdate(
      { slug, status: "Published" },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching blog" });
  }
};

export const searchBlogs = async (req, res) => {
  try {
    const { q, page = 1, limit = 8 } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({ success: false, message: "Search query 'q' is required" });
    }

    const skip = (Number(page) - 1) * Number(limit);
    const filter = { status: "Published", $text: { $search: q } };

    const [blogs, totalBlogs] = await Promise.all([
      Blog.find(filter, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: "textScore" } })
        .skip(skip)
        .limit(Number(limit)),
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
    res.status(500).json({ success: false, message: "Error searching blogs" });
  }
};

export const getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 8 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const filter = { status: "Published", category };

    const [blogs, totalBlogs] = await Promise.all([
      Blog.find(filter).sort({ publishedAt: -1 }).skip(skip).limit(Number(limit)),
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
    res.status(500).json({ success: false, message: "Error fetching blogs by category" });
  }
};

export const getRelatedBlogs = async (req, res) => {
  try {
    const { slug } = req.params;
    const current = await Blog.findOne({ slug });

    if (!current) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    const related = await Blog.find({
      _id: { $ne: current._id },
      status: "Published",
      $or: [{ category: current.category }, { tags: { $in: current.tags } }],
    })
      .sort({ publishedAt: -1 })
      .limit(4);

    res.status(200).json({ success: true, data: related });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching related blogs" });
  }
};

export const getPopularBlogs = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const blogs = await Blog.find({ status: "Published" }).sort({ views: -1 }).limit(Number(limit));

    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching popular blogs" });
  }
};