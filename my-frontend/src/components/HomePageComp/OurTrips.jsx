import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cards from "../../components/GlobalComp/Cards.jsx";

const OurTrips = ({ tripsData }) => {
  const normalizedTripsData = Array.isArray(tripsData)
    ? { All: tripsData }
    : Object.entries(tripsData || {}).reduce((acc, [category, trips]) => {
        acc[category] = Array.isArray(trips) ? trips : [];
        return acc;
      }, {});

  const categories = Object.keys(normalizedTripsData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showAll, setShowAll] = useState(false);
  const activeTrips = normalizedTripsData[activeCategory] || [];

  useEffect(() => {
    if (!activeCategory && categories.length) {
      setActiveCategory(categories[0]);
    }
  }, [activeCategory, categories]);

  if (!categories.length) {
    return null;
  }

  return (
    <div className="w-full px-6 md:px-18 py-10 pt-36">
      <motion.h2
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-teal-600">Discover</span> Our Trips
      </motion.h2>

      <motion.div className="flex flex-wrap justify-center gap-4 mb-6">
        {categories.map((category, index) => (
          <motion.button
            key={index}
            className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border transition-all ${
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
          <Cards trips={activeTrips} showAll={showAll} />
        </motion.div>
      </AnimatePresence>

      {activeTrips.length > 4 && (
        <div className="flex items-center justify-center w-full">
          <button
            className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All Packages"}
          </button>
        </div>
      )}
    </div>
  );
};

export default OurTrips;
