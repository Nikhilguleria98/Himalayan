import { motion } from "framer-motion";
import {
  Sun, Cloud, Backpack, TrendingUp, Wifi, CreditCard, HeartPulse
} from "lucide-react";

const INFO_CARDS = [
  {
    icon: Sun, title: "Best Time to Visit",
    content: "July to October is ideal. Roads open up post-monsoon for a clear experience.",
    color: "from-yellow-400 to-orange-400", bg: "bg-yellow-50",
  },
  {
    icon: Cloud, title: "Weather",
    content: "5°C to 25°C. Pack layers — nights can be very cold at altitude.",
    color: "from-blue-400 to-cyan-400", bg: "bg-blue-50",
  },
  {
    icon: Backpack, title: "Packing List",
    content: "Thermals, waterproof jacket, trekking boots, sunscreen SPF 50+, first-aid.",
    color: "from-emerald-400 to-green-400", bg: "bg-emerald-50",
  },
  {
    icon: TrendingUp, title: "Difficulty",
    content: "Easy to Moderate. Basic fitness recommended. All age groups welcome.",
    color: "from-rose-400 to-pink-400", bg: "bg-rose-50",
  },
  {
    icon: Wifi, title: "Network",
    content: "BSNL works in most areas. Jio/Airtel only in major towns. Offline maps advised.",
    color: "from-violet-400 to-purple-400", bg: "bg-violet-50",
  },
  {
    icon: CreditCard, title: "ATM",
    content: "Limited ATMs in Kaza. Carry sufficient cash before entering Spiti.",
    color: "from-teal-400 to-cyan-500", bg: "bg-teal-50",
  },
  {
    icon: HeartPulse, title: "Medical",
    content: "Basic facilities in Kaza. Carry personal medicines. Guides carry oxygen.",
    color: "from-red-400 to-rose-500", bg: "bg-red-50",
  },
];

export default function TravelInformation({ bestTimeToVisit, embedded = false }) {
  const firstCard = bestTimeToVisit?.multipleWays?.[0];
  const cards = INFO_CARDS.map((card) => {
    if (card.title === "Best Time to Visit" && firstCard?.desc) {
      return { ...card, content: firstCard.desc };
    }
    return card;
  });

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
          Travel Tips
        </span>
        <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">Travel Information</h2>
        <p className="mt-1 text-sm text-gray-500">Essential details to help you prepare</p>
      </motion.div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        {cards.map(({ icon: Icon, title, content, color, bg }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            whileHover={{ y: -4, transition: { duration: 0.18 } }}
            className={`rounded-2xl ${bg} p-4 transition`}
          >
            <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-sm`}>
              <Icon className="h-4.5 w-4.5 text-white" style={{ height: "18px", width: "18px" }} />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-gray-700">{title}</h3>
            <p className="mt-1 text-xs leading-5 text-gray-500">{content}</p>
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
