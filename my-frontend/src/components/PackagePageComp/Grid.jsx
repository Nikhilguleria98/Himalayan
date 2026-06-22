import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPackages } from "../../store/client/tourPackage-slice";

const Grid = () => {
  const [visibleItems, setVisibleItems] = useState(6);
  const dispatch = useDispatch();
  const { packageList, isLoading, error } = useSelector(
    (state) => state.clientTourPackages
  );
  const packages = Array.isArray(packageList) ? packageList : [];

  useEffect(() => {
    dispatch(fetchAllPackages());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  return (
    <div className="w-full px-8 md:px-18 py-18 mt-12 md:mt-0 rounded-lg">
      <h2 className="text-center text-3xl font-bold mb-12">
        Our <span className="text-[#0C8699]">Package</span>
      </h2>

      {isLoading && (
        <p className="text-center text-gray-600">Loading packages...</p>
      )}

      {error && <p className="text-center text-red-600">{error}</p>}

      {!isLoading && !error && packages.length === 0 && (
        <p className="text-center text-gray-600">No packages available yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {packages.slice(0, visibleItems).map((item) => {
          const image = item.gallery?.[0] || "/placeholder.svg";
          const price = Number(item.salePrice || item.price || 0);

          return (
            <Link
              key={item._id}
              to={`/package/${item._id}`}
              className="group relative block overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-4"
            >
              <div className="w-full h-[180px] md:h-[200px] lg:h-[240px] overflow-hidden rounded-xl">
                <img
                  className="w-full h-full object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                  src={image}
                  alt={item.title}
                />
              </div>

              {item.duration && (
                <div className="absolute top-2 right-2 bg-black/40 text-white text-xs md:text-base px-4 py-1 rounded-lg font-bold">
                  {item.duration}
                </div>
              )}

              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl">
                <h3 className="text-white text-lg md:text-xl font-bold">
                  {item.title}
                </h3>
                <div className="mt-1 flex items-center justify-between gap-3 text-sm text-white">
                  <span>{item.averageReview || 5}/5 Reviews</span>
                  {price > 0 && (
                    <span className="font-semibold">
                      Rs. {price.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        {visibleItems < packages.length && (
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-600 mr-4"
          >
            View All Packages
          </button>
        )}
        {visibleItems > 6 && (
          <button
            onClick={() => setVisibleItems(6)}
            className="px-6 py-2 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-600"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default Grid;
