// import React from 'react'

// const OurTrips = () => {
//   return (
//     <div>OurTrips</div>
//   )
// }

// export default OurTrips

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tripsData = {
  "Top Destinations": [
    { id: 1, title: "Chandigarh To Spiti Valley Tour", duration: "8 Nights, 9 Days", price: "₹ 16,950", badge: "Best Seller", image: "images/HomePage/IMG-20250408-WA0004.webp" },
    { id: 2, title: "Manali To Chandratal Tour", duration: "4 Nights, 5 Days", price: "₹ 8,950", badge: "20% OFF", image: "images/HomePage/IMG-20250408-WA0005.webp" },
    { id: 3, title: "Shimla To Kalpa Tour", duration: "6 Nights, 7 Days", price: "₹ 14,499", badge: "New", image: "images/HomePage/IMG-20250408-WA0006.webp" },
    { id: 4, title: "Chandigarh To Shimla Tour", duration: "9 Nights, 10 Days", price: "₹ 18,500", badge: "New", image: "images/HomePage/IMG-20250408-WA0010.webp" },
  ],
  "New Launches": [
    { id: 5, title: "Shimla To Manali Tour", duration: "6 Nights, 7 Days", price: "₹ 14,999", badge: "New", image: "/images/HomePage/h1.png" },
    { id: 6, title: "Delhi To Shimla Tour", duration: "8 Nights, 9 Days", price: "₹ 15,999", badge: "New", image: "/images/HomePage/h1.png" },
    { id: 7, title: "Delhi To Manali Tour", duration: "8 Nights, 9 Days", price: "₹ 17,999", badge: "New", image: "/images/HomePage/h1.png" },
    { id: 8, title: "Manali To Chandratal Spiti Tour", duration: "8 Nights, 9 Days", price: "₹ 16,000", badge: "New", image: "/images/HomePage/h1.png" },
  ],
  "Trending": [
    { id: 9, title: "Shimla Spiti Tour", duration: "6 Nights, 7 Days", price: "₹ 14,499", badge: "Trending", image: "/images/HomePage/h1.png" },
    { id: 10, title: "Chandigarh kinnour Spiti Tour", duration: "9 Nights, 10 Days", price: "₹ 18,500", badge: "Trending", image: "/images/HomePage/h1.png" },
    { id: 11, title: "Shimla Spiti Circuit Manali", duration: "6 Nights, 7 Days", price: "₹ 14,999", badge: "New", image: "/images/HomePage/h1.png" },
    { id: 12, title: "Delhi Spiti Shimla Tour", duration: "8 Nights, 9 Days", price: "₹ 15,999", badge: "New", image: "/images/HomePage/h1.png" },
  ],
  "Recommended": [
    { id: 13, title: "Delhi Spiti Chandratal Manali Tour", duration: "8 Nights, 9 Days", price: "₹ 17,999", badge: "Trending", image: "/images/HomePage/h1.png" },
    { id: 14, title: "Chandigarh To Shimla Tour", duration: "2 Nights, 3 Days", price: "₹ 15,500", badge: "Trending", image: "/images/HomePage/h1.png" },
    { id: 15, title: "Shimla - Manali Tour", duration: "5 Nights, 6 Days", price: "₹ 18,000", badge: "New", image: "/images/HomePage/h1.png" },
    { id: 16, title: "Chandigarh Shimla Kinnaur Tour", duration: "3 Nights, 4 Days", price: "₹ 15,500", badge: "New", image: "/images/HomePage/h1.png" },
  ],
  "Featured": [
    { id: 17, title: "Chandigarh - Shimla Tour", duration: "3 Nights, 4 Days", price: "₹ 18,500", badge: "Trending", image: "/images/HomePage/h1.png" },
    { id: 18, title: "CHD - Shimla - Manali Tour", duration: "4 Nights, 5 Days", price: "₹ 20,000", badge: "Trending", image: "/images/HomePage/h1.png" },
    { id: 19, title: "Chandigarh To Manali Tour", duration: "6 Nights, 7 Days", price: "₹ 18,000", badge: "New", image: "/images/HomePage/h1.png" },
    { id: 20, title: "Delhi To Manali Tour", duration: "5 Nights, 6 Days", price: "₹ 15,500", badge: "New", image: "/images/HomePage/h1.png" },
  ],
};

const categories = Object.keys(tripsData);

export default function DiscoverTrips() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="container px-4 sm:px-10 md:px-16 py-16 mx-auto">
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our <span className="text-teal-600">Packages</span>
      </motion.h2>

      {/* <motion.div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
              activeCategory === category
                ? "bg-teal-600 text-white"
                : "border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
            }`}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, scale: 0.95 }}
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
                    className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-3 py-1 rounded-full shadow"
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
                <p className="text-sm text-gray-600 mt-1">⏳ {trip.duration}</p>
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
}
