import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../lib/api";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/client/blog?limit=12`);
        const data = await res.json();
        if (data.success) {
          setBlogs(data.data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // First 3 blogs are featured, others are in main grid
  const featuredArticles = blogs.slice(0, 3);
  const blogEntries = blogs.slice(3);

  const getMonthAbbreviation = (dateStr) => {
    if (!dateStr) return "MAR";
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", { month: "short" }).toUpperCase();
  };

  const getDayString = (dateStr) => {
    if (!dateStr) return "01";
    const date = new Date(dateStr);
    return date.getDate().toString().padStart(2, "0");
  };

  const formatFullDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="responsivewidth space-y-12">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
            <div className="w-full md:w-1/2 space-y-4 animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-full" />
              <div className="h-20 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="w-full md:w-1/2 max-w-lg space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex gap-4 animate-pulse">
                  <div className="w-[163px] h-24 bg-gray-200 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-6 bg-gray-200 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Main Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='py-8 bg-gray-50 min-h-screen'>
      {/* Header Section */}
      <div className='flex responsivewidth flex-col md:flex-row justify-between gap-8 mb-12'>
        <div className='w-full md:w-1/2 flex justify-center items-start flex-col'>
          <h1 className=' text-3xl md:text-5xl lg:text-6xl font-bold font-poppins mb-4'>
            <span className=' text-[#0c8699] '>Blog</span> and Article
          </h1>
          <p className='mb-4 justify-start text-black text-xl font-normal font-Poppins'>
            Dive into stories from the heart of the Himalayas. From spiritual journeys to thrilling treks, our blogs bring the mountains closer to you.
          </p>
          <div className='inline-block rounded-full overflow-hidden'>
            <img
              src='/assets/heartNako.png'
              alt='Heart of Nako'
              width={300}
              height={200}
              className='w-[100px] sm:w-[150px] md:w-[180px] lg:w-[216px] lg:h-[92px] rounded-[54px]'
            />
          </div>
        </div>

        {/* Featured Articles */}
        <div className='w-full md:w-1/2 max-w-lg space-y-4'>
          {featuredArticles.map((item, index) => (
            <Link
              key={item._id}
              to={`/blog/${item.slug}`}
              className='flex border-b-[2px] border-gray-200 pb-2 gap-2 lg:gap-4 items-center group block'
            >
              <div className='w-[163px] relative flex-shrink-0 overflow-hidden rounded-md h-24'>
                <img
                  src={item.images && item.images[0] ? item.images[0].url : '/assets/cycling.png'}
                  alt={item.title}
                  className='w-full h-full rounded-md object-cover transform group-hover:scale-105 transition-transform duration-300'
                />
              </div>
              <div className='flex-1'>
                <div className='flex justify-between text-base font-normal text-gray-500 font-poppins leading-[30px]'>
                  <span>{formatFullDate(item.publishedAt || item.createdAt)}</span>
                  <span>{item.readingTime || 5} min read</span>
                </div>
                <h3 className='justify-start text-black text-lg lg:text-xl font-semibold font-poppins leading-[30px] group-hover:text-[#0c8699] transition-colors'>
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Blog Grid */}
      <div className='grid responsivewidth mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {blogEntries.map((entry, index) => (
          <motion.div
            key={entry._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full'
          >
            <Link to={`/blog/${entry.slug}`} className="flex flex-col h-full">
              <div className='relative h-48 overflow-hidden'>
                <img
                  src={entry.images && entry.images[0] ? entry.images[0].url : '/assets/himalya.png'}
                  alt={entry.title}
                  className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-500'
                />
                <div className='absolute bottom-3 -left-0.5 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded'>
                  <div className='text-center'>
                    <span>{getDayString(entry.publishedAt || entry.createdAt)}</span>
                    <div className='text-[10px]'>{getMonthAbbreviation(entry.publishedAt || entry.createdAt)}</div>
                  </div>
                </div>
              </div>
              <div className='p-4 flex flex-col flex-1'>
                <h3 className='justify-start text-black text-xl font-semibold font-poppins leading-[30px] mb-2 line-clamp-2 hover:text-[#0c8699] transition-colors'>
                  {entry.title}
                </h3>
                <p className='text-gray-600 justify-start text-Color-2 text-base font-normal font-poppins leading-[30px] line-clamp-3'>
                  {entry.shortDescription}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className='flex justify-center'>
        <Link
          to='#'
          className='bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors'
        >
          View All Blogs
        </Link>
      </div>
    </div>
  );
}

