import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../lib/api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/client/blog?limit=6`);
        const data = await response.json();

        if (response.ok && data.success) {
          setBlogs(Array.isArray(data.data) ? data.data : []);
        }
      } catch (error) {
        console.error("Failed to load blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const mainBlogPosts = blogs.slice(0, 2);
  const sideBlogPosts = blogs.slice(2);
  return (
    <main className="container mx-auto px-4 py-12 max-w-7xl bg-custom-gradient">
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-[40px] font-medium font-poppins">
            Our Latest <span className="text-[#0C8699]">Blogs</span>
          </h2>
          <Link
            to="/Blog"
            className="bg-[#0C8699] text-white px-4 py-2 text-[16px] hover:bg-teal-600 transition-colors rounded-full"
          >
            View All Blogs
          </Link>
        </div>

        {loading ? (
          <div className="py-10 text-center text-gray-500">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="py-10 text-center text-gray-500">No blogs published yet.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {mainBlogPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-64">
                    <img
                      src={post.images?.[0]?.url || "/images/HomePage/latestBlogs.png"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span className="text-[#9A9A9A] text-[16px] font-poppins">
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-IN")}
                      </span>
                      <span className="text-[#64607D] text-[16px] font-poppins">
                        {post.readingTime || 5} min read
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 font-poppins line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 text-[16px] font-poppins line-clamp-3">
                      {post.shortDescription || post.description || "Read the full story on our blog."}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="space-y-6 self-start">
              {sideBlogPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="block border-b pb-6 last:border-b-0 border-[#DEE1E6]"
                >
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-IN")}</span>
                    <span>{post.readingTime || 5} min read</span>
                  </div>
                  <h3 className="text-lg font-semibold font-poppins line-clamp-2">{post.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Blogs;
