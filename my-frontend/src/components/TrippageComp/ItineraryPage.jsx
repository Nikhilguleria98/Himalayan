import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const itineraryData = [
  {
    day: 1,
    title: "Arrival in Shimla – Local Sightseeing",
    details:
      "Arrive in Shimla and check into your hotel. In the afternoon, explore Mall Road, Ridge, Christ Church, and Lakkar Bazaar. Enjoy the serene views and pleasant weather. Overnight stay in Shimla.",
  },
  {
    day: 2,
    title: "Shimla – Kufri Excursion – Jakhu Temple",
    details:
      "After breakfast, head to Kufri, a small hill station known for adventure activities and beautiful views. Visit Kufri Fun World and Himalayan Nature Park. Later, visit Jakhu Temple and enjoy panoramic views from the top. Return to Shimla for the night.",
  },
  {
    day: 3,
    title: "Shimla to Manali (250 km / approx. 7-8 hours)",
    details:
      "Drive to Manali through scenic valleys, crossing Mandi and Kullu. Enjoy the drive along the Beas River. En route, visit the famous Pandoh Dam and Kullu Shawl Factory. Check into your Manali hotel and rest for the night.",
  },
  {
    day: 4,
    title: "Manali – Solang Valley Adventure Day",
    details:
      "After breakfast, head to Solang Valley. Enjoy adventure sports like paragliding, ropeway, ATV ride, and skiing (seasonal). In winter, the snow-covered valley is a delight. Return to Manali in the evening. Optional: Visit Atal Tunnel if time permits.",
  },
  {
    day: 5,
    title: "Manali – Local Sightseeing",
    details:
      "Explore local attractions including Hidimba Devi Temple, Manu Temple, Vashisht Hot Springs, and Tibetan Monastery. Stroll around Old Manali cafes or shop at the Mall Road. Overnight stay in Manali.",
  },
  {
    day: 6,
    title: "Departure – Manali to Chandigarh/Delhi",
    details:
      "After breakfast, check out from the hotel and drive back to Chandigarh/Delhi for your return journey. Trip ends with beautiful memories of the Himachal hills.",
  },
];

const ItineraryItem = ({ day, title, details, isOpen, onToggle }) => (
  <div className="relative flex items-start mb-12">
    {/* Day label */}
    <div className="w-24 text-right pr-4 text-teal-600 font-bold text-lg">
      Day {day}
    </div>

    {/* Dot indicator */}
    <div className="relative w-6 flex justify-center items-start">
      <div className="w-3 h-3 bg-teal-500 rounded-full z-10 mt-1" />
    </div>

    {/* Details Card */}
    <div className="flex-1 bg-white border rounded-lg shadow-sm p-4 ml-4">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <button
          onClick={onToggle}
          className="ml-4 w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition"
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>
      {isOpen && <p className="text-gray-600 mt-2">{details}</p>}
    </div>
  </div>
);

const ItineraryTimeline = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 relative">
      <h2 className="text-2xl font-bold mb-10">Itinerary</h2>

      {/* Vertical line */}
      <div className="absolute top-24 left-[131px] w-px bg-teal-400 h-[calc(100%-14rem)] z-0"></div>

      {itineraryData.map((item, index) => (
        <ItineraryItem
          key={index}
          day={item.day}
          title={item.title}
          details={item.details}
          isOpen={openIndex === index}
          onToggle={() => toggleOpen(index)}
        />
      ))}

      {/* Download button */}
      <div className="text-center mt-10">
        <button className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ItineraryTimeline;
