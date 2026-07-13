// import React from 'react'

// const OurTrips = () => {
//   return (
//     <div>OurTrips</div>
//   )
// }

// export default OurTrips

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPackages } from "../../store/client/tourPackage-slice";

export default function DiscoverTrips() {
  const dispatch = useDispatch();
  const { packageList, isLoading } = useSelector((state) => state.clientTourPackages);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchAllPackages());
  }, [dispatch]);

  const categories = useMemo(() => {
    const packages = Array.isArray(packageList) ? packageList : [];
    const tags = [...new Set(packages.map((item) => item.tag).filter(Boolean))];
    return ["All", ...tags];
  }, [packageList]);

  const visiblePackages = useMemo(() => {
    const packages = Array.isArray(packageList) ? packageList : [];
    if (activeCategory === "All") return packages;
    return packages.filter((item) => item.tag === activeCategory);
  }, [activeCategory, packageList]);

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

      <motion.div className="flex flex-wrap justify-center gap-4 mb-10">
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
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            <div className="col-span-full py-10 text-center text-gray-500">Loading packages...</div>
          ) : visiblePackages.length === 0 ? (
            <div className="col-span-full py-10 text-center text-gray-500">No packages available for this category yet.</div>
          ) : (
            visiblePackages.map((trip) => {
              const image = trip.gallery?.[0] || "/images/HomePage/h1.png";
              const price = Number(trip.salePrice || trip.price || 0);

              return (
                <motion.div
                  key={trip._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <img src={image} alt={trip.title} className="w-full h-48 object-cover" />
                    {trip.tag && (
                      <motion.span
                        className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-3 py-1 rounded-full shadow"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {trip.tag}
                      </motion.span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold line-clamp-2">{trip.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">⏳ {trip.duration || "Available on request"}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-teal-600 text-sm font-bold">
                        {price > 0 ? `₹ ${price.toLocaleString("en-IN")}` : "Price on request"}
                      </p>
                      <p className="text-yellow-500 text-sm">⭐ {trip.averageReview || 5}/5</p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
