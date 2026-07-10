import { motion } from "framer-motion";

const ACTIVITY_IMAGES = {
  Trekking: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
  Camping: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80",
  "River Rafting": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  Bonfire: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400&q=80",
  Photography: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80",
  "ATV Ride": "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&q=80",
  Shopping: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
  Stargazing: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80",
};

const FALLBACK_ACTIVITIES = [
  { thing: "Trekking", desc: "Explore scenic mountain trails" },
  { thing: "Camping", desc: "Sleep under a million stars" },
  { thing: "River Rafting", desc: "Thrilling whitewater experience" },
  { thing: "Bonfire", desc: "Cozy evenings with fellow travelers" },
  { thing: "Photography", desc: "Capture breathtaking landscapes" },
  { thing: "Stargazing", desc: "Marvel at pristine night skies" },
];

const hasText = (v) => Boolean(String(v || "").trim());

export default function ThingsToDo({ thingsToDo, embedded = false }) {
  const rawThings = thingsToDo?.multipleWays?.filter(
    (t) => hasText(t.thing) || hasText(t.desc)
  );
  const activities = rawThings?.length ? rawThings : FALLBACK_ACTIVITIES;

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
          Activities
        </span>
        <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">Things To Do</h2>
        <p className="mt-1 text-sm text-gray-500">Action-packed experiences awaiting you</p>
      </motion.div>

      <div className="grid gap-3 grid-cols-3 sm:grid-cols-6">
        {activities.map((activity, i) => {
          const name = activity.thing || "Activity";
          const img = ACTIVITY_IMAGES[name] ||
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="group relative overflow-hidden rounded-2xl shadow-sm cursor-pointer"
              style={{ height: embedded ? "140px" : "180px" }}
            >
              <img
                src={img}
                alt={name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-teal-500/0 transition-all duration-300 group-hover:bg-teal-500/20" />
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <p className="text-xs font-bold text-white">{name}</p>
              </div>
            </motion.div>
          );
        })}
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
