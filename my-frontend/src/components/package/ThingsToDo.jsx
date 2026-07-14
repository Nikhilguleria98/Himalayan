import { motion } from "framer-motion";

const hasText = (value) => Boolean(String(value || "").trim());

export default function ThingsToDo({ thingsToDo, embedded = false }) {
  const activities = (thingsToDo?.multipleWays || []).filter((item) => hasText(item.thing) || hasText(item.desc));
  if (!activities.length) return null;

  const inner = <>
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="mb-6">
      <span className="inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-700">Activities</span>
      {thingsToDo?.title && <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">{thingsToDo.title}</h2>}
    </motion.div>
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {activities.map((activity, index) => <motion.div key={`${activity.thing}-${index}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06, duration: 0.35 }} className="relative overflow-hidden rounded-2xl bg-teal-700 p-3" style={{ height: embedded ? "140px" : "180px" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 to-teal-600" />
        <div className="relative flex h-full flex-col justify-end"><p className="text-xs font-bold text-white">{activity.thing}</p>{activity.desc && <p className="mt-1 line-clamp-3 text-xs text-teal-100">{activity.desc}</p>}</div>
      </motion.div>)}
    </div>
  </>;
  return embedded ? <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-6 shadow-sm">{inner}</div> : <section className="bg-[#F8FAFC] py-16"><div className="responsivewidth">{inner}</div></section>;
}
