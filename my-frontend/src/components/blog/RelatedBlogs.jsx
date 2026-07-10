import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../lib/api";

export default function RelatedBlogs({ currentSlug }) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/client/blog/related/${currentSlug}`);
        const data = await res.json();
        if (data.success) {
          setRelated(data.data);
        }
      } catch (err) {
        console.error("Error fetching related blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    if (currentSlug) {
      fetchRelated();
    }
  }, [currentSlug]);

  if (loading) {
    return (
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h3 className="text-2xl font-bold text-gray-800 font-poppins mb-8">Related Adventures</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-5 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (related.length === 0) return null;

  return (
    <div className="mt-16 border-t border-gray-100 pt-12">
      <h3 className="text-2xl font-bold text-gray-800 font-poppins mb-8">Related Adventures</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={blog.images && blog.images[0] ? blog.images[0].url : "/images/HomePage/latestBlogs.png"}
                alt={blog.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-teal-600 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                {blog.category}
              </span>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <span className="text-xs text-gray-400 font-poppins mb-2">
                {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <h4 className="text-lg font-bold text-gray-800 font-poppins mb-3 line-clamp-2 hover:text-teal-600 transition-colors">
                <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
              </h4>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
                {blog.shortDescription}
              </p>
              <Link
                to={`/blog/${blog.slug}`}
                className="text-teal-600 font-semibold text-sm hover:text-teal-700 inline-flex items-center gap-1 mt-auto"
              >
                Read More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
