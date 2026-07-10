import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";

export default function CTASection({ onBookNow }) {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 via-gray-900/85 to-black/90" />

      {/* Topographic SVG pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="20" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)" />
        </svg>
      </div>

      {/* Mountain silhouette */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 opacity-20">
        <svg viewBox="0 0 1440 200" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,200 L0,100 L120,40 L240,100 L360,20 L480,80 L600,10 L720,60 L840,0 L960,70 L1080,30 L1200,90 L1320,50 L1440,100 L1440,200 Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="responsivewidth relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/20 backdrop-blur-sm border border-teal-400/30">
            <Compass className="h-8 w-8 text-teal-300" />
          </div>

          <span className="inline-block rounded-full bg-teal-400/20 px-4 py-1 text-sm font-semibold text-teal-300 backdrop-blur-sm border border-teal-400/20">
            The Journey Awaits
          </span>

          <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Ready for Your Next
            <br />
            <span className="bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Adventure?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg text-gray-300">
            Every great journey starts with a single step. Let us plan yours — with expert guides,
            breathtaking routes, and memories that last a lifetime.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBookNow}
              className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-teal-500/30 transition hover:shadow-teal-400/40"
            >
              Book This Trip Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03 }}
              href="/Contact"
              className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Talk to an Expert
            </motion.a>
          </div>

          {/* Trust line */}
          <p className="mt-6 text-sm text-gray-400">
            🔒 Secure booking · ✅ Instant confirmation · 💰 Best price guarantee
          </p>
        </motion.div>
      </div>
    </section>
  );
}
