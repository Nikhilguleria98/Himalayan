import React, { useState } from "react";
import { motion } from "framer-motion";

export default function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-800 to-emerald-800 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl transform translate-x-8 -translate-y-8" />
      
      <h3 className="text-xl font-bold mb-2 font-poppins relative z-10">Get Mountain Stories</h3>
      <p className="text-teal-100 text-sm mb-4 font-poppins relative z-10">
        Subscribe to our newsletter and receive curated Himalayan adventures and travel deals directly in your inbox.
      </p>

      {subscribed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center text-emerald-100 text-sm font-semibold"
        >
          ✓ Thanks for subscribing!
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative z-10">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email Address"
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm"
            required
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-white text-teal-900 font-bold py-2.5 rounded-xl text-sm transition-colors hover:bg-teal-50"
          >
            Subscribe Now
          </motion.button>
        </form>
      )}
    </div>
  );
}
