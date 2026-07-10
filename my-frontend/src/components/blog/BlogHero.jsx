import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BlogHero({ blog }) {
  const publishedDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative h-[60vh] min-h-[400px] max-h-[600px] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
      {/* Featured Background Image */}
      {blog.images && blog.images[0] && (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={blog.images[0].url}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Dark Overlay mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 text-white mt-16 md:mt-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-teal-200 mb-4 uppercase tracking-wider font-semibold">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/Blog" className="hover:text-white transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-300 truncate max-w-[200px]">{blog.title}</span>
        </div>

        {/* Category Tag */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block bg-teal-500 text-white text-xs md:text-sm px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-4 shadow"
        >
          {blog.category}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6 leading-tight max-w-4xl"
        >
          {blog.title}
        </motion.h1>

        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-300 font-poppins"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold font-poppins">
              {blog.author ? blog.author.charAt(0) : "H"}
            </div>
            <span>{blog.author || "Himalayan Team"}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{publishedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{blog.readingTime || 5} min read</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
