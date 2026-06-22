import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Cards = ({ trips, showAll }) => {
  const tripList = Array.isArray(trips) ? trips : [];
  const visibleTrips = tripList.slice(
    0,
    tripList.length <= 4 ? tripList.length : showAll ? tripList.length : 4
  );

  return (
    <>
      {visibleTrips.map((trip, index) => {
        const price = Number(trip.salePrice || trip.price || 0);

        return (
          <motion.div
            key={trip._id || index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={`/package/${trip._id}`} className="block h-full">
              <div className="relative">
                <img
                  src={trip.gallery?.[0] || "/placeholder.svg"}
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
                  Duration: {trip.duration || "Available on request"}
                </p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="text-teal-600 text-sm font-bold">
                    {price > 0
                      ? `Rs. ${price.toLocaleString("en-IN")}`
                      : "Price on request"}
                  </p>
                  <p className="text-yellow-600 text-sm">
                    {trip.averageReview || 5}/5 Reviews
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </>
  );
};

export default Cards;
