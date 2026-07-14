import { motion } from "framer-motion";
import { Plane, Train, Car } from "lucide-react";

const ICONS = [Plane, Train, Car];
const COLORS = ["from-blue-500 to-indigo-600", "from-emerald-500 to-teal-600", "from-orange-500 to-amber-600"];
const hasText = (value) => Boolean(String(value || "").trim());

export default function HowToReach({ howToReach, embedded = false }) {
  const ways = (howToReach?.multipleWays || []).filter((way) => hasText(way.medium) || hasText(way.desc));
  if (!ways.length) return null;

  const inner = <>
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="mb-6">
      <span className="inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-700">Getting There</span>
      {howToReach?.title && <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">{howToReach.title}</h2>}
    </motion.div>
    <div className="grid gap-4 sm:grid-cols-3">
      {ways.map((way, index) => { const Icon = ICONS[index] || Car; return <motion.div key={`${way.medium}-${index}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12, duration: 0.4 }} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className={`bg-gradient-to-r ${COLORS[index % COLORS.length]} px-5 py-5`}><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20"><Icon className="h-6 w-6 text-white" /></div>{way.medium && <h3 className="mt-3 text-base font-bold text-white">{way.medium}</h3>}</div>
        {way.desc && <div className="px-5 py-4"><p className="text-sm leading-6 text-gray-600">{way.desc}</p></div>}
      </motion.div>; })}
    </div>
  </>;
  return embedded ? <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-6 shadow-sm">{inner}</div> : <section className="bg-[#F8FAFC] py-16"><div className="responsivewidth">{inner}</div></section>;
}
