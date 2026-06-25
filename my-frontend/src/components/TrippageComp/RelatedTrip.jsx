// import React from 'react'

// const OurTrips = () => {
//   return (
//     <div>OurTrips</div>
//   )
// }

// export default OurTrips

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tripsData = {
  "Top Destinations": [
    { id: 1, title: "Kashmir Great Lakes Trek", duration: "6 Nights, 7 Days", price: "₹ 12,500", badge: "Best Seller", image: "/images/HomePage/h1.png" },
    { id: 2, title: "Chandranahan Lake Trek", duration: "4 Nights, 5 Days", price: "₹ 14,000", badge: "20% OFF", image: "/images/HomePage/h1.png" },
    { id: 3, title: "Tarsar Marsar Lake Trek", duration: "7 Nights, 8 Days", price: "₹ 18,000", badge: "New", image: "/images/HomePage/h1.png" },
    { id: 4, title: "Valley of Flowers Trek", duration: "6 Nights, 7 Days", price: "₹ 15,500", badge: "New", image: "/images/HomePage/h1.png" },
  ],
  "New Launches": [
    { id: 5, title: "Himalayan Adventure", duration: "7 Nights, 8 Days", price: "₹ 18,000", badge: "New", image: "/images/HomePage/h1.png" },
    { id: 6, title: "Kerala Backwaters", duration: "6 Nights, 7 Days", price: "₹ 15,500", badge: "New", image: "/images/HomePage/h1.png" },
    { id: 7, title: "Himalayan Adventure", duration: "7 Nights, 8 Days", price: "₹ 18,000", badge: "New", image: "/images/HomePage/h1.png" },
    { id: 8, title: "Kerala Backwaters", duration: "6 Nights, 7 Days", price: "₹ 15,500", badge: "New", image: "/images/HomePage/h1.png" },
  ],
  "Trending": [
    { id: 9, title: "Rajasthan Desert Safari", duration: "5 Nights, 6 Days", price: "₹ 13,500", badge: "Trending", image: "/images/HomePage/h1.png" },
    { id: 10, title: "Andaman Islands", duration: "6 Nights, 7 Days", price: "₹ 20,000", badge: "Trending", image: "/images/HomePage/h1.png" },
    { id: 11, title: "Himalayan Adventure", duration: "7 Nights, 8 Days", price: "₹ 18,000", badge: "New", image: "/images/HomePage/h1.png" },
    { id: 12, title: "Kerala Backwaters", duration: "6 Nights, 7 Days", price: "₹ 15,500", badge: "New", image: "/images/HomePage/h1.png" },
  ],
  "Recommended": [
    { id: 13, title: "Rajasthan Desert Safari", duration: "5 Nights, 6 Days", price: "₹ 13,500", badge: "Trending", image: "/images/HomePage/h1.png" },
    { id: 14, title: "Andaman Islands", duration: "6 Nights, 7 Days", price: "₹ 20,000", badge: "Trending", image: "/images/HomePage/h1.png" },
    { id: 15, title: "Himalayan Adventure", duration: "7 Nights, 8 Days", price: "₹ 18,000", badge: "New", image: "/images/HomePage/h1.png" },
    { id: 16, title: "Kerala Backwaters", duration: "6 Nights, 7 Days", price: "₹ 15,500", badge: "New", image: "/images/HomePage/h1.png" },
  ],
  "Featured": [
    { id: 17, title: "Rajasthan Desert Safari", duration: "5 Nights, 6 Days", price: "₹ 13,500", badge: "Trending", image: "/images/HomePage/h1.png" },
    { id: 18, title: "Andaman Islands", duration: "6 Nights, 7 Days", price: "₹ 20,000", badge: "Trending", image: "/images/HomePage/h1.png" },
    { id: 19, title: "Himalayan Adventure", duration: "7 Nights, 8 Days", price: "₹ 18,000", badge: "New", image: "/images/HomePage/h1.png" },
    { id: 20, title: "Kerala Backwaters", duration: "6 Nights, 7 Days", price: "₹ 15,500", badge: "New", image: "/images/HomePage/h1.png" },
  ],
};

const categories = Object.keys(tripsData);

const DiscoverTrips = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="container px-6 md:px-18 py-10 pt-16">
      <motion.h2
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Related <span className="text-teal-600">Trips</span>
      </motion.h2>

      {/* Uncomment this to enable category filter tabs */}
      {/* <motion.div className="flex flex-wrap justify-center gap-4 mb-6">
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
              activeCategory === category
                ? "bg-teal-600 text-white"
                : "border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
            }`}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div> */}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {tripsData[activeCategory].map((trip) => (
            <motion.div
              key={trip.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-48 object-cover"
                />
                {trip.badge && (
                  <motion.span
                    className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-3 py-1 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {trip.badge}
                  </motion.span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{trip.title}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  ⏳ {trip.duration}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-teal-600 text-sm font-bold">{trip.price}</p>
                  <p className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐ (2 Reviews)</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DiscoverTrips;
