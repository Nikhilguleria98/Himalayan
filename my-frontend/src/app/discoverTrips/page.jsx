import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock, MapPin, Search, SlidersHorizontal, Star, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { fetchAllPackages } from "../../store/client/tourPackage-slice";

const CURRENCY = import.meta.env.VITE_CURRENCY_SYMBOL || "₹";

const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating", value: "rating" },
];

export default function DiscoverTrips() {
  const dispatch = useDispatch();
  const { packageList, isLoading, error } = useSelector(
    (state) => state.clientTourPackages
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  // Sync searchQuery state when URL query param changes (e.g. navigation from home page)
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchQuery(q);
  }, [searchParams]);

  const updateSearchQuery = (val) => {
    setSearchQuery(val);
    setVisibleCount(9);
    if (val.trim()) {
      setSearchParams({ q: val }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  useEffect(() => {
    dispatch(fetchAllPackages());
  }, [dispatch]);

  // Normalize packageList — it can come as an array or an object keyed by category
  const allPackages = useMemo(() => {
    if (Array.isArray(packageList)) return packageList;
    if (packageList && typeof packageList === "object") {
      return Object.values(packageList).flat();
    }
    return [];
  }, [packageList]);

  // Extract unique categories
  const categories = useMemo(() => {
    if (!Array.isArray(packageList) && packageList && typeof packageList === "object") {
      return ["All", ...Object.keys(packageList)];
    }
    const cats = [...new Set(allPackages.map((p) => p.category).filter(Boolean))];
    return ["All", ...cats];
  }, [packageList, allPackages]);

  // Get max price for slider
  const maxPrice = useMemo(() => {
    const prices = allPackages.map((p) => Number(p.salePrice || p.price || 0));
    return Math.max(...prices, 100000);
  }, [allPackages]);

  // Filter + sort
  const filteredPackages = useMemo(() => {
    let result = [...allPackages];

    // Category filter (also works when packageList is object-keyed)
    if (selectedCategory !== "All") {
      if (!Array.isArray(packageList) && packageList && typeof packageList === "object") {
        result = Array.isArray(packageList[selectedCategory])
          ? [...packageList[selectedCategory]]
          : [];
      } else {
        result = result.filter((p) => p.category === selectedCategory);
      }
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.pickDrop?.toLowerCase().includes(q)
      );
    }

    // Price range
    result = result.filter((p) => {
      const price = Number(p.salePrice || p.price || 0);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    if (sortBy === "price_asc") {
      result.sort((a, b) => Number(a.salePrice || a.price || 0) - Number(b.salePrice || b.price || 0));
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => Number(b.salePrice || b.price || 0) - Number(a.salePrice || a.price || 0));
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.averageReview || 5) - (a.averageReview || 5));
    }

    return result;
  }, [allPackages, packageList, searchQuery, selectedCategory, priceRange, sortBy]);

  const visiblePackages = filteredPackages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPackages.length;

  const resetFilters = () => {
    updateSearchQuery("");
    setSortBy("relevance");
    setSelectedCategory("All");
    setPriceRange([0, maxPrice]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fafb] to-white">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="responsivewidth relative z-10 text-center">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover Your Next <span className="text-emerald-200">Adventure</span>
          </motion.h1>
          <motion.p
            className="text-teal-100 text-base md:text-lg max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore handpicked Himalayan trips — from spiritual getaways to thrilling bike tours
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="search-trips"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  updateSearchQuery(e.target.value);
                }}
                placeholder="Search trips by name, destination, or activity..."
                className="w-full pl-12 pr-12 py-4 rounded-full bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all text-sm md:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => updateSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="responsivewidth py-8 md:py-12">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(9);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                showFilters
                  ? "bg-teal-50 border-teal-300 text-teal-700"
                  : "bg-white border-gray-200 text-gray-600 hover:border-teal-300"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                id="sort-trips"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2 text-sm text-gray-600 focus:outline-none focus:border-teal-300 cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-end gap-6">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 mb-4 block">
                      Price Range
                    </label>
                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-m font-bold text-gray-500">From</span>
                          <span className="text-sm font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                            {CURRENCY}{priceRange[0].toLocaleString("en-IN")}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={maxPrice}
                          step={500}
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])
                          }
                          className="w-full accent-teal-600"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-m font-bold text-gray-500">To</span>
                          <span className="text-sm font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                            {CURRENCY}{priceRange[1].toLocaleString("en-IN")}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={maxPrice}
                          step={500}
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])
                          }
                          className="w-full accent-teal-600"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={resetFilters}
                    className="px-5 py-2 text-sm font-medium text-teal-600 border border-teal-200 rounded-full hover:bg-teal-50 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {isLoading ? (
              "Loading trips..."
            ) : (
              <>
                Showing <span className="font-semibold text-gray-800">{filteredPackages.length}</span> trip
                {filteredPackages.length !== 1 ? "s" : ""}
                {searchQuery && (
                  <>
                    {" "}for "<span className="font-semibold text-teal-600">{searchQuery}</span>"
                  </>
                )}
              </>
            )}
          </p>
          {(searchQuery || selectedCategory !== "All") && (
            <button
              onClick={resetFilters}
              className="text-sm text-teal-600 hover:text-teal-700 underline underline-offset-2"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse"
              >
                <div className="h-52 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                  <div className="flex justify-between">
                    <div className="h-5 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-100 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="text-center py-16">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchAllPackages())}
              className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredPackages.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏔️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No trips found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? `We couldn't find any trips matching "${searchQuery}". Try different keywords.`
                : "No packages available for the selected filters."}
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Package Cards Grid */}
        {!isLoading && filteredPackages.length > 0 && (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              <AnimatePresence mode="popLayout">
                {visiblePackages.map((trip) => {
                  const price = Number(trip.salePrice || trip.price || 0);
                  const originalPrice = trip.salePrice ? Number(trip.price || 0) : 0;
                  const hasDiscount = originalPrice > 0 && originalPrice > price;

                  return (
                    <motion.div
                      key={trip._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        to={`/package/${trip._id}`}
                        className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-teal-100 transition-all duration-300"
                      >
                        {/* Image */}
                        <div className="relative h-52 overflow-hidden">
                          <img
                            src={trip.gallery?.[0] || "/placeholder.svg"}
                            alt={trip.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                          {/* Badge */}
                          {trip.badge && (
                            <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                              {trip.badge}
                            </span>
                          )}

                          {/* Duration */}
                          {trip.duration && (
                            <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {trip.duration}
                            </span>
                          )}

                          {/* Discount */}
                          {hasDiscount && (
                            <span className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                              {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-gray-800 group-hover:text-teal-700 transition-colors line-clamp-1">
                            {trip.title}
                          </h3>

                          {trip.pickDrop && (
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1.5">
                              <MapPin className="h-3.5 w-3.5 text-teal-500 shrink-0" />
                              <span className="line-clamp-1">{trip.pickDrop}</span>
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div>
                              {price > 0 ? (
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xl font-bold text-teal-600">
                                    {CURRENCY}{price.toLocaleString("en-IN")}
                                  </span>
                                  {hasDiscount && (
                                    <span className="text-sm text-gray-400 line-through">
                                      {CURRENCY}{originalPrice.toLocaleString("en-IN")}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-sm font-medium text-gray-500">Price on request</span>
                              )}
                              <p className="text-xs text-gray-400 mt-0.5">per person</p>
                            </div>

                            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full">
                              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                              <span className="text-sm font-semibold text-amber-700">
                                {trip.averageReview || 5}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 shadow-md shadow-teal-200 hover:shadow-lg hover:shadow-teal-200 transition-all"
                >
                  Load More Trips ({filteredPackages.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
