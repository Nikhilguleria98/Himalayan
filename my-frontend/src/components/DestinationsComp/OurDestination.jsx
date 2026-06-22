import React from "react";

const data = [
  {
    img: "/images/destinationPage/IMG_0339.webp",
    title: "Himachal Himalayan Trek",
    rewiew: 12,
  },
  {
    img: "/images/destinationPage/IMG_0263.webp",
    title: "Kerala Backwater Escape",
    rewiew: 18,
  },
  {
    img: "/images/destinationPage/IMG_0320.webp",
    title: "Rajasthan Desert Safari",
    rewiew: 25,
  },
];

const OurDestination = () => {
  return (
    <div className="w-full px-6 md:px-18 py-16 sm:mt-0">
      <h2 className="text-center text-3xl font-bold mb-12">
        Our <span className="text-[#0C8699]">Destinations</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 w-full mt-6">
        {/* Main Large Image */}
        <div className="relative col-span-1 md:col-span-2 row-span-1">
          <img
            className="w-full h-[200px] md:h-[280px] lg:h-[320px] object-cover rounded-xl shadow-md"
            src="/images/destinationPage/sectionimg3.png"
            alt="Winter Meghalaya Trip"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-4 rounded-xl">
            <h3 className="text-white text-lg md:text-xl font-bold">
              Winter Meghalaya Trip
            </h3>
            <p className="text-white text-sm">⭐⭐⭐⭐⭐ (2 Reviews)</p>
          </div>
        </div>

        {/* Secondary Fixed Image */}
        <div className="relative col-span-1 row-span-1">
          <img
            className="w-full h-[200px] md:h-[280px] lg:h-[320px] object-cover rounded-xl shadow-md"
            src="/images/destinationPage/megh1.webp"
            alt="Meghalaya"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-4 rounded-xl">
            <h3 className="text-white text-lg md:text-xl font-bold">
              Winter Meghalaya Trip
            </h3>
            <p className="text-white text-sm">⭐⭐⭐⭐⭐ (2 Reviews)</p>
          </div>
        </div>

        {/* Dynamic Data Cards */}
        {data.map((item, index) => (
          <div key={index} className="relative">
            <img
              className="w-full h-[200px] md:h-[280px] lg:h-[320px] object-cover rounded-xl shadow-md"
              src={item.img}
              alt={item.title}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4 rounded-xl">
              <h3 className="text-white text-lg md:text-xl font-bold">
                {item.title}
              </h3>
              <p className="text-white text-sm">
                ⭐⭐⭐⭐⭐ ({item.rewiew} Reviews)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurDestination;
