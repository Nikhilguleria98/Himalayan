import { motion, useMotionValue, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Users, Map, Award, ThumbsUp } from "lucide-react";

function AnimatedCounter({ target, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.floor(v)),
    });
    return controls.stop;
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}

const STATS = [
  {
    icon: Users,
    value: 12000,
    suffix: "+",
    label: "Happy Travelers",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Map,
    value: 500,
    suffix: "+",
    label: "Trips Completed",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Award,
    value: 8,
    suffix: "+",
    label: "Years of Experience",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: ThumbsUp,
    value: 98,
    suffix: "%",
    label: "Customer Satisfaction",
    color: "from-emerald-500 to-green-600",
  },
];

export default function TripStatistics() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-teal-950 to-gray-900 py-16">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="responsivewidth relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-teal-300">
            Our Track Record
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Trusted by Thousands
          </h2>
          <p className="mt-2 text-gray-400">
            Numbers that speak for our passion for travel
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ icon: Icon, value, suffix, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur-sm transition hover:bg-white/10"
            >
              {/* Icon */}
              <div
                className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg shadow-black/30`}
              >
                <Icon className="h-7 w-7 text-white" />
              </div>

              {/* Counter */}
              <p className="text-4xl font-bold text-white">
                <AnimatedCounter target={value} suffix={suffix} />
              </p>

              {/* Label */}
              <p className="mt-2 text-sm font-medium text-gray-400">{label}</p>

              {/* Decorative hover glow */}
              <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
