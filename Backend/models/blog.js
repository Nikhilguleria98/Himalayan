import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    shortDescription: {
      type: String,
      required: true,
      maxlength: 300,
    },

    content: {
      type: String,
      required: true,
    },

    images: {
      type: [
        {
          url: {
            type: String,
            required: true,
          },
          order: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "At least one image is required",
      },
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Adventure",
        "Trekking",
        "Cycling",
        "Travel Tips",
        "Culture",
        "Food",
      ],
    },

    tags: {
      type: [String],
      default: [],
      index: true,
    },

    author: {
      type: String,
      default: "Himalayan Team",
    },

    // ==========================
    // Event Details
    // ==========================
    event: {
      title: {
        type: String,
        default: "",
      },

      startDate: {
        type: Date,
        default: null,
      },

      endDate: {
        type: Date,
        default: null,
      },

      reportingTime: {
        type: String,
        default: "",
      },

      departureTime: {
        type: String,
        default: "",
      },

      location: {
        type: String,
        default: "",
      },

      registrationDeadline: {
        type: Date,
        default: null,
      },

      timezone: {
        type: String,
        default: "Asia/Kolkata",
      },
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },

    readingTime: {
      type: Number,
      default: 1,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    seo: {
      metaTitle: {
        type: String,
        default: "",
      },

      metaDescription: {
        type: String,
        default: "",
      },

      keywords: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

// ==========================
// Generate Unique Slug
// ==========================
blogSchema.pre("validate", async function (next) {
  if (this.isModified("title") || !this.slug) {
    let baseSlug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    let slug = baseSlug;
    let counter = 1;

    const Blog = this.constructor;

    while (await Blog.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }

  next();
});

// ==========================
// Calculate Reading Time
// ==========================
blogSchema.pre("validate", function (next) {
  if (this.isModified("content")) {
    const plainText = this.content.replace(/<[^>]*>/g, " ");
    const wordCount = plainText
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    this.readingTime = Math.max(1, Math.ceil(wordCount / 200));
  }

  next();
});

// ==========================
// Published Date
// ==========================
blogSchema.pre("save", function (next) {
  if (
    this.isModified("status") &&
    this.status === "Published" &&
    !this.publishedAt
  ) {
    this.publishedAt = new Date();
  }

  next();
});

// ==========================
// Sort Images by Order
// ==========================
blogSchema.pre("save", function (next) {
  if (this.isModified("images") && Array.isArray(this.images)) {
    this.images = [...this.images]
      .sort((a, b) => a.order - b.order)
      .map((img, index) => ({
        url: img.url,
        order: index,
      }));
  }

  next();
});

// ==========================
// Full Text Search Index
// ==========================
blogSchema.index({
  title: "text",
  shortDescription: "text",
  tags: "text",
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;