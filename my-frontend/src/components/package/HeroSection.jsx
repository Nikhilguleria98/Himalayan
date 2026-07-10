import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft, Calendar, Heart, MapPin, Share2, Star,
  ChevronRight, Clock, Users, Image as ImageIcon
} from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection({ trip, pricePerPerson, onViewGallery, onBookNow }) {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [wishlist, setWishlist] = useState(false);
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const coverImage =
    trip?.gallery?.[0] ||
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";

  const currencySymbol = import.meta.env.VITE_CURRENCY_SYMBOL || "₹";

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section
      ref={heroRef}
      className="relative h-[70vh] min-h-[520px] w-full overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY }}
      >
        <img
          src={coverImage}
          alt={trip?.title || "Package Cover"}
          className="h-[120%] w-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Top Bar: Breadcrumb + Actions */}
      <motion.div
        style={{ opacity }}
        className="absolute top-0 left-0 right-0 px-4 pt-6 md:px-8 lg:px-12"
      >
        <div className="flex items-center justify-between">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-sm text-white/80">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm transition hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <ChevronRight className="h-3 w-3 mx-1 text-white/50" />
            <span className="text-white/60">Packages</span>
            <ChevronRight className="h-3 w-3 mx-1 text-white/50" />
            <span className="text-white/90 max-w-[200px] truncate">{trip?.title}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
            </button>
            <button
              onClick={() => setWishlist((w) => !w)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm backdrop-blur-sm transition ${
                wishlist
                  ? "bg-rose-500 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Heart className={`h-4 w-4 ${wishlist ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 px-4 pb-10 md:px-8 lg:px-12"
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              <MapPin className="h-3 w-3" />
              {trip?.pickDrop || "Premium Travel Package"}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {trip?.title || "Discover the Himalayas"}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2 text-base text-white/75 sm:text-lg"
          >
            An unforgettable journey through majestic peaks and pristine valleys
          </motion.p>

          {/* Meta Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 flex flex-wrap items-center gap-3"
          >
            {/* Rating */}
            <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-white">4.9</span>
              <span className="text-xs text-white/60">(10k+ reviews)</span>
            </div>

            {/* Duration */}
            {trip?.duration && (
              <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <Clock className="h-4 w-4 text-teal-300" />
                <span className="text-sm font-medium text-white">{trip.duration}</span>
              </div>
            )}

            {/* Group */}
            <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <Users className="h-4 w-4 text-teal-300" />
              <span className="text-sm font-medium text-white">Group & Private</span>
            </div>

            {/* Calendar */}
            <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <Calendar className="h-4 w-4 text-teal-300" />
              <span className="text-sm font-medium text-white">Jul – Oct</span>
            </div>
          </motion.div>

          {/* Price + CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            {/* Price */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60">Starting From</p>
              <p className="text-3xl font-bold text-white">
                {pricePerPerson > 0
                  ? `${currencySymbol} ${pricePerPerson.toLocaleString("en-IN")}`
                  : "Price on request"}
              </p>
              <p className="text-xs text-white/50">per person</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onBookNow}
                className="rounded-xl bg-teal-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/30 transition hover:bg-teal-400 hover:shadow-teal-400/40 active:scale-95"
              >
                Book Now
              </button>
              <button
                onClick={onViewGallery}
                className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <ImageIcon className="h-4 w-4" />
                View Gallery
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
