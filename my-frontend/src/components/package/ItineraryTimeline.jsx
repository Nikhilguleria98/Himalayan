import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, MapPin, Utensils, Home } from "lucide-react";

const hasText = (v) => Boolean(String(v || "").trim());

export default function ItineraryTimeline({ itinerary = [], embedded = false }) {
  const [openDay, setOpenDay] = useState(0);

  if (!itinerary.length) return null;

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
          Day-by-Day
        </span>
        <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">Trip Itinerary</h2>
        <p className="mt-1 text-sm text-gray-500">
          Your {itinerary.length}-day adventure, carefully planned
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-teal-100 hidden sm:block" />

        <div className="space-y-3">
          {itinerary.map((day, index) => {
            const isOpen = openDay === index;
            const dayNum = day.day || index + 1;

            return (
              <motion.div
                key={day._id || index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
                className="relative sm:pl-12"
              >
                {/* Day badge */}
                <div className="absolute left-0 top-4 hidden sm:flex h-[44px] w-[44px] items-center justify-center rounded-full border-4 border-white bg-teal-500 shadow-md shadow-teal-200">
                  <div className="text-center leading-tight">
                    <p className="text-[8px] font-bold uppercase text-teal-100">Day</p>
                    <p className="text-xs font-bold text-white">{dayNum}</p>
                  </div>
                </div>

                <div className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all ${isOpen ? "border-teal-200 shadow-teal-100/50" : "border-gray-100"}`}>
                  <button
                    type="button"
                    onClick={() => setOpenDay(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      {/* Mobile badge */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500 text-white sm:hidden">
                        <span className="text-xs font-bold">{dayNum}</span>
                      </div>
                      <div>
                        {hasText(day.Title) && (
                          <h3 className="text-sm font-bold text-gray-900">{day.Title}</h3>
                        )}
                        {hasText(day.Highlight) && (
                          <p className="mt-0.5 text-xs text-teal-600">✦ {day.Highlight}</p>
                        )}
                      </div>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                      <ChevronDown className="h-4 w-4 shrink-0 text-teal-500" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                      >
                        <div className="border-t border-gray-100 px-4 pb-4 pt-3">
                          {day.todayActivities?.filter(hasText).length > 0 && (
                            <div className="mb-3">
                              <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                                <MapPin className="h-3.5 w-3.5 text-teal-500" />
                                Today's Activities
                              </h4>
                              <ul className="space-y-1">
                                {day.todayActivities.filter(hasText).map((a, i) => (
                                  <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal-400" />
                                    {a}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {hasText(day.Note) && (
                            <div className="rounded-xl bg-amber-50 px-3 py-2">
                              <p className="text-xs text-amber-700">
                                <span className="font-semibold">📝 Note: </span>{day.Note}
                              </p>
                            </div>
                          )}
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                              <Utensils className="h-3 w-3" /> Breakfast & Dinner
                            </span>
                            <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                              <Home className="h-3 w-3" /> Hotel / Camp
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
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
