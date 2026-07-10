import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const DEFAULT_FAQS = [
  { que: "What is the cancellation policy?", ans: "Cancellations 30+ days before: full refund. 15–30 days: 50% refund. Under 15 days: no refund. Travel insurance recommended." },
  { que: "What is the refund policy?", ans: "Refunds processed within 7–10 business days to your original payment method after cancellation approval." },
  { que: "Do I need special fitness?", ans: "Basic fitness is sufficient. For high-altitude treks, light cardio 2–3 weeks before departure is recommended." },
  { que: "What food is available?", ans: "Vegetarian & non-vegetarian options. Local Himalayan cuisine — momos, thukpa, dal rice. Special diets on request." },
  { que: "Will there be mobile network?", ans: "BSNL has best coverage. Airtel/Jio only in major towns. Download offline maps and inform family before departure." },
  { que: "Is it safe for solo travelers?", ans: "Absolutely! All trips have experienced guides, friendly groups, safety protocols, and 24/7 emergency support." },
  { que: "What about weather changes?", ans: "We monitor forecasts closely. Contingency plans exist. Minor itinerary adjustments may occur for safety." },
];

const hasText = (v) => Boolean(String(v || "").trim());

export default function FAQSection({ faq = [], embedded = false }) {
  const [openIndex, setOpenIndex] = useState(null);

  const items = faq.filter((f) => hasText(f.que) || hasText(f.ans)).length
    ? faq.filter((f) => hasText(f.que) || hasText(f.ans))
    : DEFAULT_FAQS;

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
          FAQs
        </span>
        <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-1 text-sm text-gray-500">Got questions? We've got answers.</p>
      </motion.div>

      <div className="space-y-2.5">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={item._id || i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className={`overflow-hidden rounded-2xl border transition ${isOpen ? "border-teal-200 shadow-sm" : "border-gray-100 bg-white"}`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className={`h-4 w-4 shrink-0 ${isOpen ? "text-teal-500" : "text-gray-400"}`} />
                  <span className={`text-sm font-semibold ${isOpen ? "text-teal-700" : "text-gray-800"}`}>
                    {item.que}
                  </span>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22 }} className="shrink-0">
                  <ChevronDown className={`h-4 w-4 ${isOpen ? "text-teal-500" : "text-gray-400"}`} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.26, ease: "easeInOut" }}
                  >
                    <div className="border-t border-teal-100 bg-teal-50/50 px-4 pb-4 pt-3">
                      <p className="pl-7 text-xs leading-6 text-gray-600">{item.ans}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
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
      <div className="responsivewidth max-w-3xl">{inner}</div>
    </section>
  );
}
