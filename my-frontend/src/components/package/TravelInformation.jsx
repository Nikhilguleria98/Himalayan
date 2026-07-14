import { motion } from "framer-motion";
import { Info } from "lucide-react";

const hasText = (value) => Boolean(String(value || "").trim());

export default function TravelInformation({ travelInformation, embedded = false }) {
  const cards = travelInformation?.multipleWays?.filter(
    (item) => hasText(item.title) || hasText(item.desc)
  ) || [];

  if (!cards.length) return null;

  const inner = (
    <>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="mb-6">
        <span className="inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-700">Travel Tips</span>
        {travelInformation?.title && <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">{travelInformation.title}</h2>}
      </motion.div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div key={`${card.title}-${index}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06, duration: 0.35 }} className="rounded-2xl bg-teal-50 p-4">
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600"><Info className="h-[18px] w-[18px] text-white" /></div>
            {card.title && <h3 className="text-xs font-bold uppercase tracking-wide text-gray-700">{card.title}</h3>}
            {card.desc && <p className="mt-1 text-xs leading-5 text-gray-500">{card.desc}</p>}
          </motion.div>
        ))}
      </div>
    </>
  );

  return embedded ? <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">{inner}</div> : <section className="bg-white py-16"><div className="responsivewidth">{inner}</div></section>;
}
