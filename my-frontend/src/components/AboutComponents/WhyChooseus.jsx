
import React from "react";
import { motion } from "framer-motion";

const WhyChooseus = () => {
  const data = [
    {
      img: "/images/aboutimg/best-price.png",
      title: "Best Price Guarantee",
      desc: "We offer the most competitive prices without compromising on quality. No hidden charges — just honest, affordable travel.",
    },
    {
      img: "/images/aboutimg/experienced.png",
      title: "Expert-Led Adventures",
      desc: "Our trip leaders are trained, certified, and experienced. You’ll be guided safely by professionals who know the mountains inside out.",
    },
    {
      img: "/images/aboutimg/customer-service.png",
      title: "24/7 Customer Care",
      desc: "Our support team is always available to assist you — from planning to on-trip queries. We’re just a call or message away.",
    },
    {
      img: "/images/aboutimg/travel-bag.png",
      title: "Customized Packages",
      desc: "We design trips that match your vibe — solo, group, romantic, or adventurous. Every detail tailored for you.",
    },
  ];

  return (
    <div className="mt-16 px-4 sm:px-10 md:px-20">
      <div className="text-center mb-12">
        <h1 className="text-[5vh] sm:text-[3vw] md:text-[2.5vw] font-semibold">
          Why Choose <span className="text-[#0C8699]">Us</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mt-2">
          Because we don’t just take you to the mountains — we take you beyond.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img src={item.img} alt={item.title} className="w-16 h-16 mb-3" />
            <h2 className="text-lg font-bold mb-2">{item.title}</h2>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseus;
