import { motion } from "framer-motion";
import {
  Clock, MapPin, Users, TrendingUp, Mountain,
  Sun, Home, Utensils
} from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PackageHighlights({ trip, embedded = false }) {
  const highlights = [
    {
      icon: Clock, title: "Duration", value: trip?.duration || "N/A",
      color: "from-blue-500 to-blue-600", bg: "bg-blue-50", text: "text-blue-700",
    },
    {
      icon: MapPin, title: "Destination", value: trip?.pickDrop || "Himalayas",
      color: "from-teal-500 to-teal-600", bg: "bg-teal-50", text: "text-teal-700",
    },
    {
      icon: Users, title: "Group Size", value: "2 – 20 People",
      color: "from-violet-500 to-violet-600", bg: "bg-violet-50", text: "text-violet-700",
    },
    {
      icon: TrendingUp, title: "Difficulty", value: "Easy to Moderate",
      color: "from-orange-500 to-orange-600", bg: "bg-orange-50", text: "text-orange-700",
    },
    {
      icon: Mountain, title: "Max Altitude", value: "4,500+ m",
      color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50", text: "text-emerald-700",
    },
    {
      icon: Sun, title: "Best Season", value: "July – October",
      color: "from-yellow-500 to-yellow-600", bg: "bg-yellow-50", text: "text-yellow-700",
    },
    {
      icon: Home, title: "Accommodation", value: "Hotels & Camps",
      color: "from-rose-500 to-rose-600", bg: "bg-rose-50", text: "text-rose-700",
    },
    {
      icon: Utensils, title: "Meals", value: "Breakfast & Dinner",
      color: "from-cyan-500 to-cyan-600", bg: "bg-cyan-50", text: "text-cyan-700",
    },
  ];

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
          Quick Overview
        </span>
        <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">Package Highlights</h2>
        <p className="mt-1 text-gray-500 text-sm">Everything you need to know at a glance</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {highlights.map(({ icon: Icon, title, value, color, bg, text }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.18 } }}
            className="group relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm shadow-gray-200/70 border border-gray-100 transition hover:shadow-md"
          >
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-md`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</p>
            <p className={`mt-0.5 text-sm font-bold ${text}`}>{value}</p>
            <div className={`absolute -right-3 -top-3 h-12 w-12 rounded-full ${bg} opacity-40 transition-all duration-300 group-hover:scale-150`} />
          </motion.div>
        ))}
      </motion.div>
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
    <section className="bg-[#F8FAFC] py-14">
      <div className="responsivewidth">{inner}</div>
    </section>
  );
}
