import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const FALLBACK_PLACES = [
  {
    place: "Kaza",
    desc: "The administrative headquarters of Spiti Valley, perched at 3,800m.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
  },
  {
    place: "Key Monastery",
    desc: "A spectacular thousand-year-old Tibetan Buddhist monastery.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80",
  },
  {
    place: "Chandratal Lake",
    desc: "A pristine crescent-shaped glacial lake at 4,250m altitude.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80",
  },
  {
    place: "Kunzum Pass",
    desc: "High mountain pass at 4,590m connecting Lahaul and Spiti valleys.",
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=500&q=80",
  },
];

const hasText = (v) => Boolean(String(v || "").trim());

export default function PlacesToVisit({ placesToVisit, gallery = [], embedded = false }) {
  const rawPlaces = placesToVisit?.multipleWays?.filter(
    (p) => hasText(p.place) || hasText(p.desc)
  );

  const places = rawPlaces?.length
    ? rawPlaces.map((p, i) => ({
        place: p.place,
        desc: p.desc,
        image: gallery[i + 1] || gallery[0] || FALLBACK_PLACES[i % FALLBACK_PLACES.length]?.image,
      }))
    : FALLBACK_PLACES;

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
          Explore
        </span>
        <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">Places You'll Visit</h2>
        <p className="mt-1 text-sm text-gray-500">Iconic destinations on your itinerary</p>
      </motion.div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        {places.map((place, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="group overflow-hidden rounded-2xl shadow-sm shadow-gray-200/60"
          >
            <div className="relative h-36 overflow-hidden sm:h-44">
              <img
                src={place.image}
                alt={place.place}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-teal-300" />
                  <p className="text-xs font-bold text-white">{place.place}</p>
                </div>
              </div>
            </div>
            {place.desc && (
              <div className="bg-white px-3 py-2.5">
                <p className="text-xs leading-5 text-gray-500 line-clamp-2">{place.desc}</p>
              </div>
            )}
          </motion.div>
        ))}
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
