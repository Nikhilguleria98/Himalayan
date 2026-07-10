import { motion } from "framer-motion";
import { Star, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RELATED_PACKAGES = [
  {
    id: "spiti-road",
    title: "Spiti Road Trip",
    destination: "Delhi to Delhi",
    duration: "7N/8D",
    price: 21500,
    originalPrice: 23000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    tag: "Bestseller",
  },
  {
    id: "spiti-backpack",
    title: "Spiti Backpacking Trip",
    destination: "Delhi to Delhi",
    duration: "7N/8D",
    price: 23500,
    originalPrice: 25000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80",
    tag: "Popular",
  },
  {
    id: "spiti-bike",
    title: "Spiti Bike & Backpacking",
    destination: "Delhi to Delhi",
    duration: "9N/10D",
    price: 31000,
    originalPrice: 32500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80",
    tag: "Adventure",
  },
  {
    id: "all-girls-spiti",
    title: "All Girls Road Trip to Spiti",
    destination: "Delhi to Delhi",
    duration: "8N/9D",
    price: 25000,
    originalPrice: 27500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1623491979897-9eb5cd0eee07?w=500&q=80",
    tag: "Girls Special",
  },
];

export default function RelatedPackages() {
  const navigate = useNavigate();
  const currencySymbol = import.meta.env.VITE_CURRENCY_SYMBOL || "₹";

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
            onClick={() => navigate("/package")}
            className="hidden items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700 md:flex"
          >
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Horizontal scroll on mobile, grid on lg */}
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {RELATED_PACKAGES.map((pkg, i) => (
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
                    <p className="text-xs text-gray-400 line-through">
                      {currencySymbol} {pkg.originalPrice.toLocaleString("en-IN")}
                    </p>
                    <p className="text-base font-bold text-teal-600">
                      {currencySymbol} {pkg.price.toLocaleString("en-IN")}
                    </p>
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
