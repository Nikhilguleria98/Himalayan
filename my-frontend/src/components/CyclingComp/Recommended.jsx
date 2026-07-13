// import React from 'react'

// const OurTrips = () => {
//   return (
//     <div>OurTrips</div>
//   )
// }

// export default OurTrips

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPackages } from "../../store/client/tourPackage-slice";

export default function Recommended() {
  const dispatch = useDispatch();
  const { packageList } = useSelector((state) => state.clientTourPackages);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchAllPackages());
  }, [dispatch]);

  const categories = useMemo(() => {
    const packages = Array.isArray(packageList) ? packageList : [];
    const tags = [...new Set(packages.map((item) => item.tag).filter(Boolean))];
    return ["All", ...tags];
  }, [packageList]);

  const visibleTrips = useMemo(() => {
    const packages = Array.isArray(packageList) ? packageList : [];
    if (activeCategory === "All") return packages;
    return packages.filter((item) => item.tag === activeCategory);
  }, [activeCategory, packageList]);

  return (
    <div className="container px-6 md:px-18 py-10 pt-32">
      <motion.h2
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-teal-600">Recommended</span> Trips
      </motion.h2>

      <motion.div className="flex flex-wrap justify-center gap-4 mb-6">
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
          {visibleTrips.map((trip) => (
            <motion.div
              key={trip._id}
              className="overflow-hidden rounded-lg bg-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={`/package/${trip._id}`}
                className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-600"
                aria-label={`View details for ${trip.title}`}
              >
              <div className="relative">
                <img src={trip.gallery?.[0] || "/images/HomePage/h1.png"} alt={trip.title} className="w-full h-48 object-cover" />
                {trip.tag && (
                  <motion.span
                    className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-3 py-1 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {trip.tag}
                  </motion.span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{trip.title}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-gray-600">⏳ {trip.duration || "Available on request"}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm font-bold text-teal-600">
                    {Number(trip.salePrice || trip.price || 0) > 0
                      ? `${import.meta.env.VITE_CURRENCY_SYMBOL || "₹"}${Number(trip.salePrice || trip.price || 0).toLocaleString("en-IN")}`
                      : "Price on request"}
                  </p>
                  <p className="text-sm text-yellow-500">⭐ {Number(trip.averageReview || 5)}/5</p>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
