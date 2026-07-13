import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Section6 = () => {
  const themes = [
    {
      id: 1,
      title: "Mountain Retreats",
      description: "Scenic stays and curated itineraries for teams who want a calm, premium escape away from the daily routine.",
    },
    {
      id: 2,
      title: "Adventure Escapes",
      description: "Trekking, biking, and outdoor activities designed to energize teams while creating shared memories.",
    },
    {
      id: 3,
      title: "Cultural Journeys",
      description: "Immersive travel that blends local heritage, food, and hospitality with business-friendly planning.",
    },
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 400;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="responsivewidth font-poppins mt-10">
      <h1 className="text-center text-[4vh] md:text-[5vh] font-bold">
        Popular <span className="text-[#0C8699]">Travel Themes</span>
      </h1>
      <div className="mt-10">
        <div
          ref={scrollRef}
          className="flex space-x-6 py-4 pl-4 scroll-smooth overflow-x-hidden"
        >
          {themes.map((item) => (
            <div
              key={item.id}
              className="min-w-[240px] md:min-w-[320px] rounded-lg border border-gray-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
            >
              <h3 className="font-semibold text-[16px] text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 space-x-4 text-white">
          <button
            onClick={() => scroll("left")}
            className="p-3 bg-[#0C8699] rounded-full"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 bg-[#0C8699] rounded-full"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section6;
