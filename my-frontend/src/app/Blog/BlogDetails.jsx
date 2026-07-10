import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../../lib/api";
import BlogHero from "../../components/blog/BlogHero";
import BlogContent from "../../components/blog/BlogContent";
import BlogSidebar from "../../components/blog/BlogSidebar";
import RelatedBlogs from "../../components/blog/RelatedBlogs";

export default function BlogDetails() {
  const { id } = useParams(); // URL parameter representing the slug
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/client/blog/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Blog Not Found");
          }
          throw new Error("Failed to fetch blog details");
        }
        const data = await res.json();
        if (data.success && data.data) {
          setBlog(data.data);
        } else {
          throw new Error("Blog Not Found");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Network Error");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  // Scroll to top on load/param change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Loading skeleton state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Skeleton Hero */}
        <div className="w-full h-[50vh] min-h-[350px] bg-slate-900 animate-pulse relative flex items-end p-8">
          <div className="w-full max-w-6xl mx-auto space-y-4">
            <div className="h-4 bg-slate-800 rounded w-1/4" />
            <div className="h-10 bg-slate-800 rounded w-2/3" />
            <div className="h-4 bg-slate-800 rounded w-1/3" />
          </div>
        </div>

        {/* Skeleton Body Container */}
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-8">
          {/* Main Content Area Skeleton */}
          <div className="flex-1 space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-48 bg-gray-200 rounded-xl w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          </div>

          {/* Sidebar Skeleton */}
          <div className="w-full lg:w-[350px] space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4 animate-pulse">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
              <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto" />
              <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-12 bg-gray-200 rounded w-full" />
              <div className="h-10 bg-gray-200 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error/Not found UI
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full"
        >
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 font-poppins mb-2">Blog Not Found</h2>
          <p className="text-gray-500 mb-8">
            {error === "Blog Not Found"
              ? "The blog story you are looking for might have been moved or deleted."
              : "An error occurred while loading this adventure story. Please try again."}
          </p>
          <Link
            to="/Blog"
            className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-md shadow-teal-600/10 w-full"
          >
            Return to Blogs
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Dynamic Hero Section */}
      <BlogHero blog={blog} />

      {/* Main Grid Wrapper */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main content body */}
          <div className="flex-1 w-full bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Short Description */}
              <p className="text-lg text-gray-600 italic font-poppins border-l-4 border-teal-500 pl-4 mb-8 leading-relaxed">
                {blog.shortDescription}
              </p>

              {/* Complete content parser */}
              <BlogContent content={blog.content} />

              {/* Tags Section */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-md font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar Column */}
          <BlogSidebar blog={blog} />
        </div>

        {/* Related blogs section */}
        <RelatedBlogs currentSlug={blog.slug} />
      </div>
    </motion.div>
  );
}
