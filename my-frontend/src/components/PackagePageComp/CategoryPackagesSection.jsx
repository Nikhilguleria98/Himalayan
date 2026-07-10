import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { API_BASE_URL } from "../../lib/api";

const CategoryPackagesSection = ({
  tag,
  title,
  description,
  emptyMessage = "No packages available for this category yet.",
}) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tag) return;

    let isMounted = true;

    const fetchPackages = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/client/package/get?tag=${encodeURIComponent(tag)}`
        );
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load packages");
        }

        if (isMounted) {
          setPackages(Array.isArray(data.data) ? data.data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load packages");
          setPackages([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPackages();

    return () => {
      isMounted = false;
    };
  }, [tag]);

  if (!tag) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 font-sans">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          {title}
        </h2>
        {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
      </div>

      {loading && (
        <p className="text-center text-gray-500 py-10">Loading packages...</p>
      )}

      {!loading && error && (
        <p className="text-center text-red-500 py-10">{error}</p>
      )}

      {!loading && !error && packages.length === 0 && (
        <p className="text-center text-gray-500 py-10">{emptyMessage}</p>
      )}

      {!loading && !error && packages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((tour) => {
            const image = tour.gallery?.[0] || "/assets/biketour/img2.png";
            const price = Number(tour.salePrice || tour.price || 0);

            return (
              <Link
                key={tour._id}
                to={`/package/${tour._id}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 block hover:shadow-md transition-shadow"
              >
                <div className="relative" style={{ width: "100%" }}>
                  <img
                    src={image}
                    alt={tour.title}
                    className="w-full h-48 object-cover"
                  />
                  {tour.tag && (
                    <div className="absolute top-3 left-3 py-1 px-3 rounded-md text-xs font-medium text-white bg-teal-600">
                      {tour.tag}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {tour.title}
                    </h3>
                    <span className="text-xs text-gray-500">From</span>
                  </div>

                  {tour.duration && (
                    <div className="flex items-center text-xs text-gray-600 mb-2">
                      <Clock size={14} className="mr-1" />
                      <span>{tour.duration}</span>
                    </div>
                  )}

                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.round(tour.averageReview || 5)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      ({tour.averageReview || 5}/5)
                    </span>
                  </div>

                  <div className="flex justify-end">
                    <span className="text-teal-500 font-bold text-xl">
                      {price > 0
                        ? `₹ ${price.toLocaleString("en-IN")}`
                        : "Price on request"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CategoryPackagesSection;
