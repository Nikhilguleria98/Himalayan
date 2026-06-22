import React from "react";
import { Link } from "react-router-dom"; // Replace Next.js Link

const mainBlogPosts = [
  {
    id: 1,
    image: "/images/HomePage/latestBlogs.png",
    date: "06-04-2025",
    time: "2 days ago",
    title: "Shopping in Jaipur: A Journey Through Its Vibrant Markets",
    description:
      "Jaipur, the capital of Rajasthan, is known as a vibrant city for culture, history, and craftsmanship. The “Pink City” offers numerous shopping experiences because of its rich heritage. From beautiful jewellery to traditional textures. Here is an informative overview of where you can go shopping in Jaipur and get unique souvenirs.",
  },
  {
    id: 2,
    image: "/images/HomePage/latestBlogs.png",
    date: "08-04-2025",
    time: "10 min ago",
    title: "Exploring Spiti Valley: A Road Trip to the Roof of the World",
    description:
      "Spiti Valley, a cold desert mountain valley located high in the Himalayas, is the ultimate escape for nature and thrill lovers. This blog gives you insights on how to plan the perfect road trip across the valley—from monasteries to sky-touching passes.",
  },
];

const sideBlogPosts = [
  {
    id: 1,
    date: "07-04-2025",
    time: "1 day ago",
    title: "Top 5 Treks in Uttarakhand You Shouldn’t Miss in 2025",
  },
  {
    id: 2,
    date: "05-04-2025",
    time: "3 days ago",
    title: "Why Manali is the Perfect Work-from-Mountains Destination",
  },
  {
    id: 3,
    date: "08-04-2025",
    time: "3 hours ago",
    title: "Essential Packing Tips for Your Himalayan Adventure",
  },
];

const Blogs = () => {
  return (
    <main className="container mx-auto px-4 py-12 max-w-7xl bg-custom-gradient">
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-[40px] font-medium font-poppins">
            Our Latest <span className="text-[#0C8699]">Blogs</span>
          </h2>
          <Link
            to="/blogs"
            className="bg-[#0C8699] text-white px-4 py-2 text-[16px] hover:bg-teal-600 transition-colors rounded-full"
          >
            View All Packages
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main blog posts */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainBlogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-64">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span className="text-[#9A9A9A] text-[16px] font-poppins">{post.date}</span>
                    <span className="text-[#64607D] text-[16px] font-poppins">{post.time}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 font-poppins">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 text-[16px] font-poppins">
                    {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar blog posts */}
          <div className="space-y-6 self-start">
            {sideBlogPosts.map((post) => (
              <div
                key={post.id}
                className="border-b pb-6 last:border-b-0 border-[#DEE1E6]"
              >
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{post.date}</span>
                  <span>{post.time}</span>
                </div>
                <h3 className="text-lg font-semibold font-poppins">{post.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blogs;
