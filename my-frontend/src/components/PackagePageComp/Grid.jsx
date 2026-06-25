import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPackages } from "../../store/client/tourPackage-slice";
import { API_BASE_URL } from "../../lib/api";

const Grid = () => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const dispatch = useDispatch();
  const { packageList, isLoading, error } = useSelector(
    (state) => state.clientTourPackages
  );

  // Search-specific state
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Load all packages on mount (for "show all" view)
  useEffect(() => {
    dispatch(fetchAllPackages());
  }, [dispatch]);

  // Call real backend search API whenever the query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchError("");
      return;
    }

    const fetchSearch = async () => {
      setIsSearching(true);
      setSearchError("");
      setVisibleItems(6);
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/client/search/search/${encodeURIComponent(
            searchQuery.trim()
          )}`
        );
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Search failed.");
        }
        setSearchResults(data.data);
      } catch (err) {
        setSearchError(err.message);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    fetchSearch();
  }, [searchQuery]);

  // Decide which list to show: search results OR all packages
  const packages = Array.isArray(packageList) ? packageList : [];
  const displayList = searchQuery ? searchResults : packages;
  const loading = searchQuery ? isSearching : isLoading;
  const currentError = searchQuery ? searchError : error;

  const handleLoadMore = () => setVisibleItems((prev) => prev + 3);

  const renderCard = (item) => {
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
  };

  return (
    <div className="w-full px-8 md:px-18 py-18 mt-12 md:mt-0 rounded-lg">
      <h2 className="text-center text-3xl font-bold mb-4">
        Our <span className="text-[#0C8699]">Package</span>
      </h2>

      {/* Search result banner */}
      {searchQuery && (
        <div className="text-center mb-8">
          {isSearching ? (
            <p className="text-gray-500 text-sm animate-pulse">
              Searching for{" "}
              <span className="font-semibold text-[#0C8699]">
                "{searchQuery}"
              </span>
              ...
            </p>
          ) : (
            <>
              <p className="text-gray-600 text-sm">
                {searchResults.length > 0 ? (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-[#0C8699]">
                      {searchResults.length}
                    </span>{" "}
                    result{searchResults.length !== 1 ? "s" : ""} for{" "}
                    <span className="font-semibold text-[#0C8699]">
                      "{searchQuery}"
                    </span>
                  </>
                ) : (
                  <>
                    No packages found for{" "}
                    <span className="font-semibold text-[#0C8699]">
                      "{searchQuery}"
                    </span>
                  </>
                )}
              </p>
              <Link
                to="/package"
                className="text-xs text-gray-400 underline hover:text-[#0C8699] mt-1 inline-block"
              >
                ← Clear search &amp; show all packages
              </Link>
            </>
          )}
        </div>
      )}

      {!searchQuery && <div className="mb-8" />}

      {/* Loading spinner */}
      {loading && (
        <p className="text-center text-gray-500 py-10 animate-pulse">
          {searchQuery
            ? `Searching for "${searchQuery}"...`
            : "Loading packages..."}
        </p>
      )}

      {/* Error */}
      {!loading && currentError && (
        <p className="text-center text-red-500 py-6">{currentError}</p>
      )}

      {/* Empty state */}
      {!loading && !currentError && displayList.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          {searchQuery
            ? `No packages found matching "${searchQuery}". Try a different keyword.`
            : "No packages available yet."}
        </p>
      )}

      {/* Package cards */}
      {!loading && displayList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayList.slice(0, visibleItems).map(renderCard)}
        </div>
      )}

      {/* Pagination buttons */}
      <div className="flex justify-center mt-8 gap-4">
        {visibleItems < displayList.length && (
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-600 transition"
          >
            View More Packages
          </button>
        )}
        {visibleItems > 6 && (
          <button
            onClick={() => setVisibleItems(6)}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full shadow-md hover:bg-gray-300 transition"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default Grid;
