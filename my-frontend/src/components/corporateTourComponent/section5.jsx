import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Section5 = () => {
  const experiences = [
    {
      id: 1,
      title: "Executive Offsites",
      description: "Private retreats designed for leadership teams looking to reconnect, reflect, and plan ahead in calm mountain settings.",
      badge: "Leadership",
    },
    {
      id: 2,
      title: "Adventure Team Days",
      description: "High-energy outdoor activities, scenic treks, and group challenges that strengthen collaboration and trust.",
      badge: "Adventure",
    },
    {
      id: 3,
      title: "Wellness Retreats",
      description: "A slower pace of travel with yoga, nature walks, and restorative stays for focused team wellness.",
      badge: "Wellness",
    },
    {
      id: 4,
      title: "Cultural Immersion",
      description: "Blend business travel with local heritage, cuisine, and community experiences that leave a lasting impact.",
      badge: "Culture",
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
      <h1 className="text-center text-[4vh] md:text-[5vh] font-bold">Crafted for Corporate Groups</h1>
      <div className="mt-10">
        <div
          ref={scrollRef}
          className="flex space-x-6 py-4 pl-4 scroll-smooth overflow-x-hidden"
        >
          {experiences.map((item) => (
            <div
              key={item.id}
              className="min-w-[240px] md:min-w-[320px] rounded-lg border border-gray-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-3 inline-flex rounded-full bg-[#e7f7fa] px-3 py-1 text-xs font-semibold text-[#0C8699]">
                {item.badge}
              </div>
              <h3 className="font-semibold text-[16px] text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 space-x-4 text-white">
          <button onClick={() => scroll("left")} className="p-3 bg-[#0C8699] rounded-full">
            <FaChevronLeft />
          </button>
          <button onClick={() => scroll("right")} className="p-3 bg-[#0C8699] rounded-full">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section5;
