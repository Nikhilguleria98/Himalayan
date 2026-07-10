import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback } from "react";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80",
  "https://images.unsplash.com/photo-1623491979897-9eb5cd0eee07?w=800&q=80",
];

export default function ImageGallery({ gallery = [] }) {
  const images = gallery.length >= 2 ? gallery : FALLBACK_IMAGES;
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((i) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() =>
    setLightboxIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() =>
    setLightboxIndex((i) => (i + 1) % images.length), [images.length]);

  const featured = images[0];
  const side = images.slice(1, 5);

  return (
    <section className="bg-white py-6">
      <div className="responsivewidth">
        {/* Gallery Grid */}
        <div className="grid h-[420px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl md:h-[480px]">
          {/* Large Featured Image */}
          <div
            className="group relative col-span-4 row-span-2 cursor-zoom-in overflow-hidden md:col-span-2"
            onClick={() => openLightbox(0)}
          >
            <img
              src={featured}
              alt="Package featured"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
              <ZoomIn className="h-10 w-10 scale-0 text-white transition-all duration-300 group-hover:scale-100" />
            </div>
          </div>

          {/* Supporting Images */}
          {side.map((img, i) => (
            <div
              key={i}
              className="group relative col-span-2 cursor-zoom-in overflow-hidden md:col-span-1"
              onClick={() => openLightbox(i + 1)}
            >
              <img
                src={img}
                alt={`Gallery ${i + 2}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/25">
                <ZoomIn className="h-7 w-7 scale-0 text-white transition-all duration-300 group-hover:scale-100" />
              </div>
              {/* "View all" overlay on last image */}
              {i === 3 && images.length > 5 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                  <span className="text-2xl font-bold">+{images.length - 5}</span>
                  <span className="text-sm font-medium">More Photos</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
              onClick={closeLightbox}
            >
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-sm text-white">
                {lightboxIndex + 1} / {images.length}
              </div>

              {/* Prev */}
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>

              {/* Image */}
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                src={images[lightboxIndex]}
                alt={`Gallery ${lightboxIndex + 1}`}
                className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Next */}
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-7 w-7" />
              </button>

              {/* Thumbnails */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    className={`h-12 w-16 overflow-hidden rounded-lg border-2 transition ${
                      i === lightboxIndex ? "border-teal-400" : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
