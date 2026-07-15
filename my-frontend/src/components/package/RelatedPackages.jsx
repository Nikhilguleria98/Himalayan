import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Star, Clock, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllPackages } from "../../store/client/tourPackage-slice";

export default function RelatedPackages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { packageList } = useSelector((state) => state.clientTourPackages);
  const currencySymbol = import.meta.env.VITE_CURRENCY_SYMBOL || "₹";

  useEffect(() => {
    dispatch(fetchAllPackages());
  }, [dispatch]);

  const relatedPackages = useMemo(() => {
    const packages = Array.isArray(packageList) ? packageList : [];
    return packages.slice(0, 4).map((pkg) => ({
      id: pkg._id,
      title: pkg.title,
      destination: pkg.tag || pkg.duration || "Himalayan Adventure",
      duration: pkg.duration || "Available on request",
      price: Number(pkg.salePrice || pkg.price || 0),
      originalPrice: Number(pkg.price || pkg.salePrice || 0),
      rating: Number(pkg.averageReview || 5),
      image: pkg.gallery?.[0] || "/placeholder.svg",
      tag: pkg.tag || "Featured",
    }));
  }, [packageList]);

  return (
    <section className="bg-white py-16">
      <div className="responsivewidth">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <span className="inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-700">
              You May Also Like
            </span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Related Packages
            </h2>
          </div>
          <button
            onClick={() => navigate("/discoverTrips")}
            className="hidden items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700 md:flex"
          >
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Horizontal scroll on mobile, grid on lg */}
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {relatedPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group min-w-[260px] overflow-hidden rounded-2xl bg-white shadow-md shadow-gray-200/70 transition hover:shadow-xl lg:min-w-0"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Tag */}
                <span className="absolute left-3 top-3 rounded-full bg-teal-500 px-2.5 py-0.5 text-xs font-bold text-white">
                  {pkg.tag}
                </span>

                {/* Rating */}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold text-gray-800 backdrop-blur-sm">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {pkg.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-gray-900 line-clamp-2">{pkg.title}</h3>
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-teal-500" />
                    {pkg.duration}
                  </span>
                  <span>{pkg.destination}</span>
                </div>

                {/* Price + Button */}
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div>
                    {pkg.originalPrice > pkg.price ? (
                      <p className="text-xs text-gray-400 line-through">
                        {currencySymbol} {pkg.originalPrice.toLocaleString("en-IN")}
                      </p>
                    ) : null}
                    <p className="text-base font-bold text-teal-600">
                      {pkg.price > 0
                        ? `${currencySymbol} ${pkg.price.toLocaleString("en-IN")}`
                        : "Price on request"}
                    </p>
                  </div>
                  </div>
                  <button
                    onClick={() => navigate(`/package/${pkg.id}`)}
                    className="rounded-xl bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 transition hover:bg-teal-100"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
