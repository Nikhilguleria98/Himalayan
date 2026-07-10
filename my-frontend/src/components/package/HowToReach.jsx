import { motion } from "framer-motion";
import { Plane, Train, Car } from "lucide-react";

const DEFAULT_WAYS = [
  {
    icon: Plane, medium: "By Air",
    desc: "Nearest airport is Bhuntar (Kullu-Manali), ~245 km from Kaza. Hire a taxi from there.",
    color: "from-blue-500 to-indigo-600", badge: "bg-blue-100 text-blue-700",
    tip: "Flight from Delhi: ~1 hour",
  },
  {
    icon: Train, medium: "By Train",
    desc: "Nearest station is Shimla (243 km) or Kalka (310 km). Bus/taxi onward to Spiti.",
    color: "from-emerald-500 to-teal-600", badge: "bg-emerald-100 text-emerald-700",
    tip: "Shimla–Kaza: ~10 hrs by road",
  },
  {
    icon: Car, medium: "By Road",
    desc: "Two routes — via Shimla (Kinnaur) or via Manali (Rohtang Pass). Scenic 4WD roads.",
    color: "from-orange-500 to-amber-600", badge: "bg-orange-100 text-orange-700",
    tip: "Delhi to Kaza: ~700 km",
  },
];

const ICONS = [Plane, Train, Car];
const COLORS = [
  { color: "from-blue-500 to-indigo-600", badge: "bg-blue-100 text-blue-700", tip: "Book flights early" },
  { color: "from-emerald-500 to-teal-600", badge: "bg-emerald-100 text-emerald-700", tip: "Reserve seats in advance" },
  { color: "from-orange-500 to-amber-600", badge: "bg-orange-100 text-orange-700", tip: "Carry extra fuel" },
];

const hasText = (v) => Boolean(String(v || "").trim());

export default function HowToReach({ howToReach, embedded = false }) {
  const rawWays = howToReach?.multipleWays?.filter(
    (w) => hasText(w.medium) || hasText(w.desc)
  );

  const ways = rawWays?.length
    ? rawWays.map((w, i) => ({
        icon: ICONS[i] || Car,
        medium: w.medium,
        desc: w.desc,
        ...COLORS[i % COLORS.length],
      }))
    : DEFAULT_WAYS;

  const inner = (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mb-6"
      >
        <span className="inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-700">
          Getting There
        </span>
        <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">How To Reach</h2>
        <p className="mt-1 text-sm text-gray-500">Multiple ways to start your adventure</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3">
        {ways.map(({ icon: Icon, medium, desc, color, badge, tip }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            whileHover={{ y: -5, transition: { duration: 0.18 } }}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition hover:shadow-md"
          >
            <div className={`bg-gradient-to-r ${color} px-5 py-5`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-3 text-base font-bold text-white">{medium || "By Air"}</h3>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm leading-6 text-gray-600">{desc}</p>
              {tip && (
                <span className={`mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badge}`}>
                  💡 {tip}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );

  if (embedded) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-6 shadow-sm">
        {inner}
      </div>
    );
  }

  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="responsivewidth">{inner}</div>
    </section>
  );
}
