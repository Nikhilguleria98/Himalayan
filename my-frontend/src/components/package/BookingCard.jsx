import { motion } from "framer-motion";
import {
  Shield, Zap, Headphones, BadgePercent,
  Minus, Plus, User, ChevronDown
} from "lucide-react";

const TRUST_BADGES = [
  { icon: Shield, label: "Secure Booking" },
  { icon: Zap, label: "Instant Confirmation" },
  { icon: Headphones, label: "24×7 Support" },
  { icon: BadgePercent, label: "Best Price Guarantee" },
];

export default function BookingCard({
  trip,
  traveler,
  setTraveler,
  quantity,
  setQuantity,
  pricePerPerson,
  totalPrice,
  isBooking,
  isAlreadyBooked,
  bookingMessage,
  handleBooking,
}) {
  const currencySymbol = import.meta.env.VITE_CURRENCY_SYMBOL || "₹";

  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-4 py-5 sm:px-6">
          <p className="text-sm font-medium text-teal-100">Starting From</p>
          <div className="mt-1 flex items-end gap-2">
            <span className="text-3xl font-bold text-white">
              {pricePerPerson > 0
                ? `${currencySymbol} ${pricePerPerson.toLocaleString("en-IN")}`
                : "Price on request"}
            </span>
            {pricePerPerson > 0 && (
              <span className="mb-1 text-sm text-teal-100">/ person</span>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleBooking} className="space-y-4 px-4 py-5 sm:px-6">
          {/* Traveler Name */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <User className="h-3.5 w-3.5" /> Traveler Name
            </label>
            <input
              required
              value={traveler.name}
              onChange={(e) =>
                setTraveler((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter full name"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          {/* Age + Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Age
              </label>
              <input
                required
                min="1"
                max="99"
                type="number"
                value={traveler.age}
                onChange={(e) =>
                  setTraveler((prev) => ({ ...prev, age: e.target.value }))
                }
                placeholder="Age"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Gender
              </label>
              <div className="relative">
                <select
                  value={traveler.gender}
                  onChange={(e) =>
                    setTraveler((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Number of Travelers */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Number of Travelers
            </label>
            <div className="flex items-center overflow-hidden rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, Number(q) - 1))}
                className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-teal-600"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                required
                min="1"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="flex-1 border-0 py-2.5 text-center text-sm font-semibold text-gray-800 outline-none"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => Number(q) + 1)}
                className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-teal-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Total Price */}
          {pricePerPerson > 0 && (
            <div className="rounded-xl bg-teal-50 px-4 py-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  {currencySymbol} {pricePerPerson.toLocaleString("en-IN")} × {quantity} person{Number(quantity) > 1 ? "s" : ""}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-semibold text-gray-700">Total Amount</span>
                <span className="text-xl font-bold text-teal-700">
                  {currencySymbol} {totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isBooking || isAlreadyBooked}
            className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-500/25 transition hover:from-teal-500 hover:to-teal-400 hover:shadow-teal-400/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isBooking
              ? "Processing..."
              : isAlreadyBooked
                ? "Already Booked"
                : `Book Now – ${currencySymbol} ${totalPrice.toLocaleString("en-IN")}`}
          </button>

          {/* Booking Message */}
          {bookingMessage && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-lg px-3 py-2.5 text-sm ${
                bookingMessage.toLowerCase().includes("sent") || bookingMessage.toLowerCase().includes("success")
                  ? "bg-teal-50 text-teal-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {bookingMessage}
            </motion.p>
          )}
        </form>

        {/* Trust Badges */}
        <div className="border-t border-gray-100 px-4 py-4 sm:px-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-50">
                  <Icon className="h-3.5 w-3.5 text-teal-600" />
                </div>
                <span className="text-xs font-medium text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
