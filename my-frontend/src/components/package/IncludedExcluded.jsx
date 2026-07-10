import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const hasText = (v) => Boolean(String(v || "").trim());

const DEFAULT_INC = [
  "Accommodation (hotel/guesthouse/camp)",
  "Breakfast and dinner daily",
  "All transfers by private vehicle",
  "Expert local guide",
  "All permit and entry fees",
  "First-aid and safety equipment",
];
const DEFAULT_EXC = [
  "Airfare / train tickets to departure city",
  "Lunch and personal snacks",
  "Personal travel insurance",
  "Any personal expenses",
  "Tips and gratuities",
  "Activities not in itinerary",
];

export default function IncludedExcluded({ inclusions = [], exclusions = [], embedded = false }) {
  const inclList = inclusions.filter((i) => hasText(i.text)).length
    ? inclusions.filter((i) => hasText(i.text)).map((i) => i.text)
    : DEFAULT_INC;
  const exclList = exclusions.filter((i) => hasText(i.text)).length
    ? exclusions.filter((i) => hasText(i.text)).map((i) => i.text)
    : DEFAULT_EXC;

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
          Package Details
        </span>
        <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
          What's Included & Excluded
        </h2>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Included */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm"
        >
          <div className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3.5">
            <CheckCircle2 className="h-5 w-5 text-white" />
            <h3 className="text-sm font-bold text-white">What's Included</h3>
          </div>
          <ul className="divide-y divide-gray-50 px-5 py-3">
            {inclList.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2.5 py-2.5"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span className="text-sm text-gray-600">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Excluded */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm"
        >
          <div className="flex items-center gap-2.5 bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-3.5">
            <XCircle className="h-5 w-5 text-white" />
            <h3 className="text-sm font-bold text-white">Not Included</h3>
          </div>
          <ul className="divide-y divide-gray-50 px-5 py-3">
            {exclList.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2.5 py-2.5"
              >
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                <span className="text-sm text-gray-600">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </>
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
