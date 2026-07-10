import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, 
  Send, 
  Trash2, 
  Image as ImageIcon, 
  Plus, 
  X, 
  Eye, 
  Tag, 
  Calendar, 
  Clock, 
  Search, 
  User, 
  ChevronLeft, 
  HelpCircle,
  FileText,
  Settings,
  MapPin,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { API_BASE_URL } from "../../../lib/api";

export default function BlogEditor() {
  const { id } = useParams(); // Exists if we are editing
  const isEditMode = !!id;
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.auth);

  // Authenticate user and verify admin role permissions
  useEffect(() => {
    const activeToken = token || JSON.parse(sessionStorage.getItem("token"));
    if (!activeToken) {
      navigate("/Login");
    } else if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, token, navigate]);

  // --------------------------------------------------
  // Main Form State (aligns with schema)
  // --------------------------------------------------
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Adventure");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState("Draft");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  
  // Images: Array of { url: string, order: number }
  const [images, setImages] = useState([{ url: "", order: 0 }]);
  
  // Tags: Array of strings
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  
  // Author
  const [author, setAuthor] = useState("Himalayan Team");

  // Event Details
  const [event, setEvent] = useState({
    title: "",
    startDate: "",
    endDate: "",
    reportingTime: "",
    departureTime: "",
    location: "",
    registrationDeadline: "",
    timezone: "Asia/Kolkata"
  });

  // SEO Settings
  const [seo, setSeo] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: []
  });
  const [seoKeywordInput, setSeoKeywordInput] = useState("");

  // Sidebar (Display only / read-only stats for edit mode)
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [publishedAt, setPublishedAt] = useState(null);

  // --------------------------------------------------
  // UI & Validation States
  // --------------------------------------------------
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditMode && title) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setSlug(generated);
    }
  }, [title, isEditMode]);

  // Fetch blog data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchBlog = async () => {
        setFetching(true);
        try {
          const activeToken = token || JSON.parse(sessionStorage.getItem("token"));
          const res = await fetch(`${API_BASE_URL}/api/admin/blog/${id}`, {
            headers: {
              Authorization: `Bearer ${activeToken}`
            }
          });
          if (!res.ok) throw new Error("Blog not found");
          const resData = await res.json();
          if (resData.success && resData.data) {
            const b = resData.data;
            setTitle(b.title || "");
            setSlug(b.slug || "");
            setCategory(b.category || "Adventure");
            setFeatured(b.featured || false);
            setStatus(b.status || "Draft");
            setShortDescription(b.shortDescription || "");
            setContent(b.content || "");
            setImages(b.images && b.images.length > 0 ? b.images : [{ url: "", order: 0 }]);
            setTags(b.tags || []);
            setAuthor(b.author || "Himalayan Team");
            
            if (b.event) {
              setEvent({
                title: b.event.title || "",
                startDate: b.event.startDate ? b.event.startDate.split("T")[0] : "",
                endDate: b.event.endDate ? b.event.endDate.split("T")[0] : "",
                reportingTime: b.event.reportingTime || "",
                departureTime: b.event.departureTime || "",
                location: b.event.location || "",
                registrationDeadline: b.event.registrationDeadline ? b.event.registrationDeadline.split("T")[0] : "",
                timezone: b.event.timezone || "Asia/Kolkata"
              });
            }
            
            if (b.seo) {
              setSeo({
                metaTitle: b.seo.metaTitle || "",
                metaDescription: b.seo.metaDescription || "",
                keywords: b.seo.keywords || []
              });
            }

            setViews(b.views || 0);
            setLikes(b.likes || 0);
            setPublishedAt(b.publishedAt || null);
          }
        } catch (err) {
          console.error("Error loading blog details for editing:", err);
          setErrors({ global: "Could not load the requested blog post. Creating a new one instead." });
        } finally {
          setFetching(false);
        }
      };
      fetchBlog();
    }
  }, [id, isEditMode]);

  // --------------------------------------------------
  // Helper calculations
  // --------------------------------------------------
  // Word count / reading time
  const wordCount = content ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  const readingTime = Math.ceil(wordCount / 200) || 1;

  // SEO Score Calculation
  const seoChecklist = {
    metaTitle: seo.metaTitle && seo.metaTitle.length >= 10 && seo.metaTitle.length <= 60,
    metaDescription: seo.metaDescription && seo.metaDescription.length >= 50 && seo.metaDescription.length <= 160,
    keywords: seo.keywords && seo.keywords.length >= 3,
    slug: slug && slug.length > 3 && !/\s/.test(slug),
    featuredImage: images && images.length > 0 && images[0].url.trim() !== ""
  };
  const checklistItems = Object.values(seoChecklist);
  const seoScore = Math.round((checklistItems.filter(Boolean).length / checklistItems.length) * 100);

  // --------------------------------------------------
  // Event Handlers (Tags, Images, Actions)
  // --------------------------------------------------
  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddSeoKeyword = (e) => {
    if (e.key === "Enter" && seoKeywordInput.trim()) {
      e.preventDefault();
      if (!seo.keywords.includes(seoKeywordInput.trim())) {
        setSeo({
          ...seo,
          keywords: [...seo.keywords, seoKeywordInput.trim()]
        });
      }
      setSeoKeywordInput("");
    }
  };

  const handleRemoveSeoKeyword = (indexToRemove) => {
    setSeo({
      ...seo,
      keywords: seo.keywords.filter((_, idx) => idx !== indexToRemove)
    });
  };

  const handleAddImage = () => {
    setImages([...images, { url: "", order: images.length }]);
  };

  const handleImageChange = (index, value) => {
    const updated = [...images];
    updated[index].url = value;
    setImages(updated);
  };

  const handleImageOrderChange = (index, value) => {
    const updated = [...images];
    updated[index].order = Number(value) || 0;
    setImages(updated);
  };

  const handleRemoveImage = (indexToRemove) => {
    if (images.length === 1) {
      // Keep at least one empty item
      setImages([{ url: "", order: 0 }]);
    } else {
      setImages(images.filter((_, idx) => idx !== indexToRemove));
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!slug.trim()) newErrors.slug = "Slug URL is required";
    if (slug.trim() && /\s/.test(slug)) newErrors.slug = "Slug cannot contain spaces";
    if (!shortDescription.trim()) newErrors.shortDescription = "Short description is required";
    if (shortDescription.length > 300) newErrors.shortDescription = "Short description must be 300 characters or less";
    if (!content.trim()) newErrors.content = "Blog content body is required";
    if (!category) newErrors.category = "Category is required";
    
    const validImages = images.filter(img => img.url.trim() !== "");
    if (validImages.length === 0) {
      newErrors.images = "At least one image URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler (Publish or Save Draft)
  const handleSubmit = async (submitStatus) => {
    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    const payload = {
      title,
      slug,
      shortDescription,
      content,
      images: images.filter(img => img.url.trim() !== ""),
      category,
      tags,
      author,
      featured,
      status: submitStatus,
      event: event.title.trim() ? event : undefined,
      seo
    };

    try {
      const activeToken = token || JSON.parse(sessionStorage.getItem("token"));
      const url = isEditMode 
        ? `${API_BASE_URL}/api/admin/blog/${id}` 
        : `${API_BASE_URL}/api/admin/blog`;
      
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`
        },
        body: JSON.stringify(payload)
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || "Failed to save blog post");
      }

      setSuccessMessage(isEditMode ? "Blog updated successfully!" : "Blog created successfully!");
      
      setTimeout(() => {
        navigate("/Blog");
      }, 1500);

    } catch (err) {
      console.error(err);
      setErrors({ global: err.message || "Something went wrong while saving the post" });
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  // Delete Handler
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return;
    }
    
    setLoading(true);
    try {
      const activeToken = token || JSON.parse(sessionStorage.getItem("token"));
      const res = await fetch(`${API_BASE_URL}/api/admin/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${activeToken}`
        }
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || "Failed to delete blog post");
      }
      setSuccessMessage("Blog deleted successfully!");
      setTimeout(() => {
        navigate("/Blog");
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrors({ global: err.message || "Error deleting blog post" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 font-poppins">Loading editor details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 pt-4 font-poppins">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Alerts / Error Messages */}
        <AnimatePresence>
          {errors.global && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl text-red-700 flex items-center gap-3 shadow-sm"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errors.global}</span>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-xl text-emerald-700 flex items-center gap-3 shadow-sm"
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --------------------------------------------------
            HEADER SECTION
            -------------------------------------------------- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/Dashboard" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-teal-600 transition-colors mb-2 font-medium">
              <ChevronLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">
              {isEditMode ? "Edit Blog" : "Create Blog"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Create engaging travel stories, event announcements, and destination guides.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all font-semibold inline-flex items-center gap-2 shadow-sm text-sm"
            >
              <Eye className="w-4 h-4 text-gray-500" />
              {previewMode ? "Edit Mode" : "Preview"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSubmit("Draft")}
              disabled={loading}
              className="px-4 py-2 border border-teal-600/30 rounded-xl text-teal-700 bg-teal-50/50 hover:bg-teal-50 transition-all font-semibold inline-flex items-center gap-2 shadow-sm text-sm"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSubmit("Published")}
              disabled={loading}
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold inline-flex items-center gap-2 transition-all shadow-md shadow-teal-600/10 text-sm"
            >
              <Send className="w-4 h-4" />
              Publish Blog
            </motion.button>
          </div>
        </div>

        {/* Preview State Overlay */}
        {previewMode ? (
          <div className="bg-white rounded-2xl p-6 md:p-10 border shadow-sm max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-teal-600 uppercase font-semibold tracking-wider mb-4">
              <span>{category}</span>
              <span>•</span>
              <span>{author}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6 font-poppins">{title || "Untitled Blog Post"}</h1>
            {images[0] && images[0].url && (
              <img
                src={images[0].url}
                alt="Banner preview"
                className="w-full h-80 object-cover rounded-xl mb-8 shadow-sm"
              />
            )}
            <p className="text-lg text-gray-600 italic border-l-4 border-teal-500 pl-4 mb-8 leading-relaxed">
              {shortDescription || "No short description provided yet."}
            </p>
            <div className="prose max-w-none text-gray-700 leading-relaxed font-poppins space-y-4">
              {content ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <p className="text-gray-400 italic">No content body written yet.</p>
              )}
            </div>
            {tags.length > 0 && (
              <div className="mt-8 pt-4 border-t flex flex-wrap gap-2">
                {tags.map(t => (
                  <span key={t} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded">#{t}</span>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* --------------------------------------------------
              TWO COLUMN LAYOUT (70% EDITOR, 30% SIDEBAR)
              -------------------------------------------------- */
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* LEFT COLUMN - MAIN EDITOR (70%) */}
            <div className="flex-1 w-full space-y-8">
              
              {/* Card 1: Basic Information */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6"
              >
                <div className="flex items-center gap-2 border-b pb-3">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <h2 className="text-lg font-bold text-gray-800">Basic Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter blog title"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-semibold ${
                        errors.title ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      Slug URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="auto-generated-slug"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-mono text-gray-600 ${
                        errors.slug ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    <span className="text-[11px] text-gray-400 mt-1 block">Used in the blog URL.</span>
                    {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium ${
                        errors.category ? "border-red-400" : "border-gray-200"
                      }`}
                    >
                      <option value="Adventure">Adventure</option>
                      <option value="Trekking">Trekking</option>
                      <option value="Cycling">Cycling</option>
                      <option value="Travel Tips">Travel Tips</option>
                      <option value="Culture">Culture</option>
                      <option value="Food">Food</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                  </div>

                  <div className="flex items-center justify-between border p-4 rounded-xl bg-gray-50/30">
                    <div>
                      <span className="block text-sm font-bold text-gray-700">Featured Blog</span>
                      <span className="text-xs text-gray-400">Highlight this post on the homepage.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Short Description */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-600" />
                    <h2 className="text-lg font-bold text-gray-800">Short Description <span className="text-red-500">*</span></h2>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    shortDescription.length > 300 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
                  }`}>
                    {shortDescription.length} / 300
                  </span>
                </div>

                <textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Provide a brief summary of the blog post (maximum 300 characters)..."
                  rows={3}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm leading-relaxed ${
                    errors.shortDescription ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {errors.shortDescription && <p className="text-red-500 text-xs">{errors.shortDescription}</p>}
              </motion.div>

              {/* Card 3: Blog Content */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-600" />
                    <h2 className="text-lg font-bold text-gray-800">Blog Content <span className="text-red-500">*</span></h2>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-500" />
                      Reading Time: <strong className="text-teal-600">{readingTime} min read</strong>
                    </span>
                    <span>Words: <strong>{wordCount}</strong></span>
                  </div>
                </div>

                {/* Notion / Strapi style Rich Text Mock Toolbar */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-gray-50 rounded-xl border border-gray-100 text-gray-600">
                  <button type="button" onClick={() => setContent(content + "<h1>Heading</h1>")} className="px-2.5 py-1 text-xs font-bold hover:bg-gray-200 rounded transition-colors" title="Heading H1">H1</button>
                  <button type="button" onClick={() => setContent(content + "<h2>Subheading</h2>")} className="px-2.5 py-1 text-xs font-bold hover:bg-gray-200 rounded transition-colors" title="Heading H2">H2</button>
                  <div className="h-4 w-px bg-gray-200" />
                  <button type="button" onClick={() => setContent(content + "<b>Bold Text</b>")} className="p-1 hover:bg-gray-200 rounded transition-colors font-bold text-sm" title="Bold">B</button>
                  <button type="button" onClick={() => setContent(content + "<i>Italic Text</i>")} className="p-1 hover:bg-gray-200 rounded transition-colors italic text-sm" title="Italic">I</button>
                  <button type="button" onClick={() => setContent(content + "<u>Underline Text</u>")} className="p-1 hover:bg-gray-200 rounded transition-colors underline text-sm" title="Underline">U</button>
                  <div className="h-4 w-px bg-gray-200" />
                  <button type="button" onClick={() => setContent(content + "<ul><li>List Item</li></ul>")} className="p-1 hover:bg-gray-200 rounded transition-colors text-xs" title="Bullet List">• List</button>
                  <button type="button" onClick={() => setContent(content + "<ol><li>List Item</li></ol>")} className="p-1 hover:bg-gray-200 rounded transition-colors text-xs" title="Numbered List">1. List</button>
                  <div className="h-4 w-px bg-gray-200" />
                  <button type="button" onClick={() => setContent(content + "<blockquote>'Quote Text'</blockquote>")} className="p-1 hover:bg-gray-200 rounded transition-colors text-xs italic font-serif" title="Blockquote">“ Quote</button>
                  <button type="button" onClick={() => setContent(content + "<a href='https://example.com'>Link Text</a>")} className="p-1 hover:bg-gray-200 rounded transition-colors text-xs" title="Add Link">Link</button>
                  <button type="button" onClick={() => setContent(content + "<img src='https://example.com/image.jpg' />")} className="p-1 hover:bg-gray-200 rounded transition-colors" title="Add Image"><ImageIcon className="w-4 h-4" /></button>
                  <button type="button" onClick={() => setContent(content + "<pre>Code Block</pre>")} className="p-1 hover:bg-gray-200 rounded transition-colors text-xs font-mono" title="Code Block">&lt;/&gt;</button>
                </div>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your complete blog here using HTML or formatted text..."
                  rows={12}
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm leading-relaxed font-mono ${
                    errors.content ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
              </motion.div>

              {/* Card 4: Images */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-teal-600" />
                    <h2 className="text-lg font-bold text-gray-800">Blog Images <span className="text-red-500">*</span></h2>
                  </div>
                  <span className="text-xs text-gray-400">First image will be the Featured Banner.</span>
                </div>

                {errors.images && <p className="text-red-500 text-xs">{errors.images}</p>}

                <div className="space-y-4">
                  {images.map((img, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-stretch md:items-center gap-3 border p-3.5 rounded-xl bg-gray-50/30">
                      
                      {/* Image Thumbnail Preview */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center border overflow-hidden">
                        {img.url.trim() ? (
                          <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-gray-300" />
                        )}
                      </div>

                      {/* URL input */}
                      <div className="flex-1">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Image URL</label>
                        <input
                          type="text"
                          value={img.url}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          placeholder="https://example.com/photo.jpg"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>

                      {/* Order Input */}
                      <div className="w-20">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Order</label>
                        <input
                          type="number"
                          value={img.order}
                          onChange={(e) => handleImageOrderChange(index, e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-center focus:outline-none"
                        />
                      </div>

                      {/* Delete Row button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors md:self-end"
                        title="Delete image row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="button"
                  onClick={handleAddImage}
                  className="w-full py-2.5 border border-dashed border-gray-300 text-gray-500 hover:text-teal-600 hover:border-teal-500 hover:bg-teal-50/10 rounded-xl transition-all text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Image URL
                </motion.button>
              </motion.div>

              {/* Card 5: Tags */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-2 border-b pb-3">
                  <Tag className="w-5 h-5 text-teal-600" />
                  <h2 className="text-lg font-bold text-gray-800">Tags</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Add Tags (Press Enter)</label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="e.g. Adventure, Spiti, Travel"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-xs font-bold font-poppins border border-teal-100"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(idx)}
                        className="text-teal-600 hover:text-teal-900 focus:outline-none"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                  {tags.length === 0 && <span className="text-xs text-gray-400 italic">No tags added yet.</span>}
                </div>
              </motion.div>

              {/* Card 6: Author */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-2 border-b pb-3">
                  <User className="w-5 h-5 text-teal-600" />
                  <h2 className="text-lg font-bold text-gray-800">Author Information</h2>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Author Name</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Himalayan Team"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-semibold text-gray-700"
                  />
                </div>
              </motion.div>

              {/* Card 7: Event Details */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6"
              >
                <div className="flex items-center gap-2 border-b pb-3">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Event Details</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Fill this only if this post is an event announcement.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Event Title</label>
                    <input
                      type="text"
                      value={event.title}
                      onChange={(e) => setEvent({ ...event, title: e.target.value })}
                      placeholder="e.g. Winter Bike Expedition 2026"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
                    <input
                      type="date"
                      value={event.startDate}
                      onChange={(e) => setEvent({ ...event, startDate: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none text-sm text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                    <input
                      type="date"
                      value={event.endDate}
                      onChange={(e) => setEvent({ ...event, endDate: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none text-sm text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Reporting Time</label>
                    <input
                      type="text"
                      value={event.reportingTime}
                      onChange={(e) => setEvent({ ...event, reportingTime: e.target.value })}
                      placeholder="e.g. 08:00 AM"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Departure Time</label>
                    <input
                      type="text"
                      value={event.departureTime}
                      onChange={(e) => setEvent({ ...event, departureTime: e.target.value })}
                      placeholder="e.g. 09:30 AM"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={event.location}
                        onChange={(e) => setEvent({ ...event, location: e.target.value })}
                        placeholder="e.g. Leh, Ladakh"
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Registration Deadline</label>
                    <input
                      type="date"
                      value={event.registrationDeadline}
                      onChange={(e) => setEvent({ ...event, registrationDeadline: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none text-sm text-gray-600"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Card 8: SEO Settings */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6"
              >
                <div className="flex items-center gap-2 border-b pb-3">
                  <Settings className="w-5 h-5 text-teal-600" />
                  <h2 className="text-lg font-bold text-gray-800">SEO Settings</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                      <span className={`text-xs ${
                        seo.metaTitle.length >= 10 && seo.metaTitle.length <= 60 ? "text-emerald-600 font-semibold" : "text-gray-400"
                      }`}>{seo.metaTitle.length} chars (Recommended: 10 - 60)</span>
                    </div>
                    <input
                      type="text"
                      value={seo.metaTitle}
                      onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
                      placeholder="SEO optimized meta title"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                      <span className={`text-xs ${
                        seo.metaDescription.length >= 50 && seo.metaDescription.length <= 160 ? "text-emerald-600 font-semibold" : "text-gray-400"
                      }`}>{seo.metaDescription.length} chars (Recommended: 50 - 160)</span>
                    </div>
                    <textarea
                      value={seo.metaDescription}
                      onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                      placeholder="Brief search engine meta description..."
                      rows={3}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Keywords (Press Enter)</label>
                    <input
                      type="text"
                      value={seoKeywordInput}
                      onChange={(e) => setSeoKeywordInput(e.target.value)}
                      onKeyDown={handleAddSeoKeyword}
                      placeholder="e.g. adventure-travel, himalayan-trips"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {seo.keywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-md flex items-center gap-1 font-mono"
                        >
                          {kw}
                          <button
                            type="button"
                            onClick={() => handleRemoveSeoKeyword(idx)}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* RIGHT COLUMN - STICKY SIDEBAR (30%) */}
            <div className="w-full lg:w-[320px] flex-shrink-0 space-y-6 lg:sticky lg:top-24">
              
              {/* Card A: Status Badge & Publishing Info */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b pb-2">Publishing</h3>
                
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">Status</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      status === "Published" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                        : status === "Archived"
                        ? "bg-slate-100 text-slate-700"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">Reading Time</span>
                    <span className="text-xs font-bold text-gray-700">{readingTime} min</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">Featured Toggle</span>
                    <span className="text-xs font-bold text-gray-700">{featured ? "Featured" : "Regular"}</span>
                  </div>

                  {isEditMode && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">Published Date</span>
                        <span className="text-xs font-bold text-gray-700">
                          {publishedAt ? new Date(publishedAt).toLocaleDateString("en-IN") : "Not Published"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">Views</span>
                        <span className="text-xs font-bold text-gray-700">{views}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">Likes</span>
                        <span className="text-xs font-bold text-gray-700">{likes}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Card B: SEO Checklist & Score */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">SEO Score</h3>
                  <span className={`text-sm font-extrabold px-2 py-0.5 rounded ${
                    seoScore >= 80 ? "bg-emerald-100 text-emerald-800" : seoScore >= 50 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                  }`}>{seoScore}%</span>
                </div>

                <div className="space-y-3">
                  {/* Score Checklist */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Meta Title Optimized</span>
                    {seoChecklist.metaTitle ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Meta Desc Optimized</span>
                    {seoChecklist.metaDescription ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">3+ Keywords Added</span>
                    {seoChecklist.keywords ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">URL Slug Valid</span>
                    {seoChecklist.slug ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Featured Image Selected</span>
                    {seoChecklist.featuredImage ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                </div>
              </div>

              {/* Card C: Publishing Quick Actions */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3.5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubmit("Published")}
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl transition-all shadow-md shadow-teal-600/10 text-sm text-center flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Publish Blog
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubmit("Draft")}
                  disabled={loading}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition-all text-sm text-center flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4 text-gray-500" />
                  Save Draft
                </motion.button>

                {isEditMode && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDelete}
                    disabled={loading}
                    className="w-full border border-red-200 text-red-600 hover:bg-red-50 font-bold py-2.5 rounded-xl transition-all text-sm text-center flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Blog
                  </motion.button>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
