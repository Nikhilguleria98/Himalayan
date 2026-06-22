import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const data = [
  { img_Src: "images/destinationPage/IMG_1501.webp" },
  { img_Src: "/images/destinationPage/IMG_0214.webp" },
  { img_Src: "/images/destinationPage/IMG_0246.webp" },
];

const DestinationSlider = () => {
  const [current, setCurrent] = useState(1);

  const handleRightClick = () => {
    setCurrent((prev) => (prev + 1) % data.length);
  };

  const handleLeftClick = () => {
    setCurrent((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-6 md:px-18 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Memories for <span className="text-[#0C8699]">Life</span>
      </h2>

      <div className="relative flex items-center justify-center w-full h-[250px] md:h-[320px] overflow-hidden">
        {data.map((item, index) => {
          let positionClass = "opacity-0 scale-75 translate-x-0";

          if (index === current) {
            positionClass = "z-20 scale-100 opacity-100 translate-x-0";
          } else if (index === (current + 1) % data.length) {
            positionClass =
              "z-10 scale-90 opacity-80 translate-x-28 md:translate-x-64";
          } else if (index === (current - 1 + data.length) % data.length) {
            positionClass =
              "z-10 scale-90 opacity-80 -translate-x-28 md:-translate-x-64";
          }

          return (
            <div
              key={index}
              className={`absolute transition-all duration-500 transform rounded-xl overflow-hidden shadow-lg ${positionClass}`}
            >
              <img
                src={item.img_Src}
                alt="cycling"
                className="w-[250px] md:w-[450px] h-[150px] md:h-[250px] object-cover rounded-xl"
              />
            </div>
          );
        })}

        {/* Left Button */}
        <button
          onClick={handleLeftClick}
          className="absolute left-2 md:left-[1px] p-2 md:p-3 bg-[#0C8699] text-white rounded-full z-30 shadow-lg"
        >
          <FaChevronLeft size={16} />
        </button>

        {/* Right Button */}
        <button
          onClick={handleRightClick}
          className="absolute right-2 md:right-0 p-2 md:p-3 bg-[#0C8699] text-white rounded-full z-30 shadow-lg"
        >
          <FaChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default DestinationSlider;
