import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../lib/api";

export default function RecentBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/client/blog/popular?limit=5`);
        const data = await res.json();
        if (data.success) {
          setBlogs(data.data);
        }
      } catch (err) {
        console.error("Error fetching popular blogs for sidebar:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Popular Stories</h4>
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex gap-3 animate-pulse">
              <div className="w-16 h-12 bg-gray-200 rounded-md" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-5/6" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Popular Stories</h4>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/blog/${blog.slug}`}
            className="flex gap-3 group items-start"
          >
            {blog.images && blog.images[0] && (
              <img
                src={blog.images[0].url}
                alt={blog.title}
                className="w-16 h-12 object-cover rounded-md flex-shrink-0 group-hover:opacity-90 transition-opacity"
              />
            )}
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-semibold text-gray-800 group-hover:text-teal-600 transition-colors line-clamp-2 leading-tight">
                {blog.title}
              </h5>
              <span className="text-xs text-gray-400">
                {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
