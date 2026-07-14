import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const hasText = (value) => Boolean(String(value || "").trim());

export default function PlacesToVisit({ placesToVisit, gallery = [], embedded = false }) {
  const places = (placesToVisit?.multipleWays || []).filter((place) => hasText(place.place) || hasText(place.desc));
  if (!places.length) return null;

  const inner = <>
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="mb-6">
      <span className="inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-700">Explore</span>
      {placesToVisit?.title && <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">{placesToVisit.title}</h2>}
    </motion.div>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {places.map((place, index) => {
        const image = gallery[index + 1] || gallery[0];
        return <motion.div key={`${place.place}-${index}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.4 }} className="group overflow-hidden rounded-2xl shadow-sm shadow-gray-200/60">
          <div className="relative h-36 overflow-hidden bg-slate-100 sm:h-44">
            {image && <img src={image} alt={place.place} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-3 pb-3"><div className="flex items-center gap-1"><MapPin className="h-3 w-3 text-teal-300" /><p className="text-xs font-bold text-white">{place.place}</p></div></div>
          </div>
          {place.desc && <div className="bg-white px-3 py-2.5"><p className="line-clamp-2 text-xs leading-5 text-gray-500">{place.desc}</p></div>}
        </motion.div>;
      })}
    </div>
  </>;
  return embedded ? <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">{inner}</div> : <section className="bg-white py-16"><div className="responsivewidth">{inner}</div></section>;
}
