import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, AlertCircle } from "lucide-react";

const TRIP_HIGHLIGHTS = [
  "Experience breathtaking mountain vistas and scenic landscapes",
  "Explore ancient monasteries and vibrant local culture",
  "Camp under a canopy of stars in pristine valleys",
  "Taste authentic local cuisine at every stop",
  "Expert guides ensuring maximum safety and comfort",
];

export default function AboutJourney({ trip, embedded = false }) {
  // If the description is empty/missing, supply a user-friendly placeholder message.
  const rawDescription = trip?.description?.trim();
  const hasDescription = Boolean(rawDescription);
  
  // Format long descriptions into short paragraphs for better readability.
  const paragraphs = hasDescription 
    ? rawDescription.split("\n\n").filter(p => p.trim() !== "")
    : ["Detailed information about this package will be available soon."];

  const coverImage =
    trip?.gallery?.[1] ||
    trip?.gallery?.[0] ||
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80";

  const inner = (
    <div className="grid items-start gap-8 md:grid-cols-2">
      {/* Text Side */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="flex flex-col justify-between h-full"
      >
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-700">
            <Sparkles className="h-3.5 w-3.5" />
            About This Package
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
            {trip?.title
              ? `Your Adventure in ${trip?.pickDrop?.split(" to ")?.[1] || "the Himalayas"}`
              : "Your Adventure Awaits"}
          </h2>
          
          <div className="mt-4 space-y-4 leading-7 text-gray-600 text-sm">
            {!hasDescription && (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3.5 rounded-xl border border-amber-100">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{paragraphs[0]}</span>
              </div>
            )}
            {hasDescription && paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-3 text-base font-semibold text-gray-800">What Makes This Trip Special</h3>
          <ul className="space-y-2.5">
            {TRIP_HIGHLIGHTS.map((highlight, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="flex items-start gap-2.5"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                <span className="text-sm text-gray-600">{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Image Side */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.12 }}
        className="relative"
      >
        <div className="overflow-hidden rounded-2xl shadow-lg shadow-gray-200/60">
          <img
            src={coverImage}
            alt="Journey"
            loading="lazy"
            className="h-[280px] w-full object-cover transition-transform duration-700 hover:scale-105 md:h-[340px]"
          />
        </div>

        {/* Floating Stat Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="absolute -bottom-4 -left-4 rounded-xl bg-white p-3 shadow-xl shadow-gray-200/70"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white">
              <span className="text-sm font-bold">4.9</span>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">★★★★★</p>
              <p className="text-xs text-gray-400">10,000+ travelers</p>
            </div>
          </div>
        </motion.div>

        <div className="absolute -right-3 -top-3 -z-10 h-28 w-28 rounded-full bg-teal-100/50 blur-2xl" />
      </motion.div>
    </div>
  );

  if (embedded) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        {inner}
      </div>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="responsivewidth">{inner}</div>
    </section>
  );
}
