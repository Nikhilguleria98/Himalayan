import { motion } from "framer-motion";
import { UserCheck, Hotel, Map, Coffee, ShieldCheck, Flame } from "lucide-react";

const FEATURES = [
  {
    icon: UserCheck, title: "Local Expert Guides",
    desc: "Certified local guides with decades of mountain experience.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Hotel, title: "Comfortable Hotels",
    desc: "Handpicked accommodations from cozy guesthouses to boutique resorts.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Map, title: "Scenic Routes",
    desc: "Itineraries crafted to maximise scenic beauty and hidden gems.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Coffee, title: "Local Cuisine",
    desc: "Authentic Himalayan food — thukpa, momos, dal baati served fresh.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: ShieldCheck, title: "Safe Transport",
    desc: "Well-maintained vehicles with experienced mountain road drivers.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: Flame, title: "Adventure Activities",
    desc: "Trek, camp, raft and ride — the best Himalayan adventures included.",
    color: "from-rose-500 to-pink-500",
  },
];

export default function WhyChooseTrip({ embedded = false }) {
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
          Why Choose Us
        </span>
        <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">Why Choose This Trip</h2>
        <p className="mt-1 text-sm text-gray-500">Trusted by over 10,000 travelers</p>
      </motion.div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group flex gap-4 rounded-2xl bg-white p-4 shadow-sm shadow-gray-200/60 border border-gray-100 transition hover:shadow-md"
          >
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-md transition-all group-hover:scale-110`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">{title}</h3>
              <p className="mt-0.5 text-xs leading-5 text-gray-500">{desc}</p>
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
