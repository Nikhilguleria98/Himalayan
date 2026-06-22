import React from "react";

const DestinationHero = () => {
  return (
    <div className="px-6 md:px-18 pt-10">
      <section className="flex flex-col md:flex-row items-center gap-4 md:gap-18">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.3]">
            Our Popular Trips in <br />
            <span className="text-[#0C8699]">Meghalaya</span>
          </h2>
          <p className="py-2">
            Explore the hidden wonders of Meghalaya — from living root bridges and mystical caves to sparkling waterfalls and serene villages. Our curated trips let you experience the vibrant culture, natural beauty, and offbeat trails of the Abode of Clouds. Whether you’re chasing clouds in Cherrapunji or boating through crystal-clear waters in Dawki, we promise an adventure that’s soulful, safe, and unforgettable.
          </p>
          <button className="text-md px-4 py-1 z-10 sm:px-[1.5vw] sm:py-[0.5vw] sm:text-[1.2vw] font-medium rounded-full text-white bg-[#0C8699]">
            Book Your Trip
          </button>
        </div>

        {/* Right Section - Image Grid */}
        <div className="md:w-1/2 flex md:mt-0 md:h-full justify-center md:justify-end items-center gap-3 sm:gap-4 relative px-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="w-[5rem] h-[5rem] sm:w-[8rem] sm:h-[8rem] lg:w-40 lg:h-40 flex items-end overflow-hidden rounded-xl ml-8 sm:ml-8 md:ml-16">
              <img
                src="/images/destinationPage/megh1.webp"
                alt="Mountain village"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[7rem] h-[7rem] sm:w-[10rem] sm:h-[10rem] lg:w-56 lg:h-[14rem] md:ml-8 lg:ml-0 rounded-xl shadow-md overflow-hidden">
              <img
                src="/images/destinationPage/IMG_0246.webp"
                alt="Cyclists"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="w-[9rem] h-[10rem] sm:w-[12rem] sm:h-[16rem] lg:w-72 lg:h-[22rem] overflow-hidden rounded-xl shadow-md">
              <img
                src="/images/destinationPage/img1.webp"
                alt="Blue building with mural"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[9rem] sm:w-[12rem] lg:w-72 lg:h-20 bg-[#0C8699] rounded-xl shadow-md mb-16 lg:mb-24 relative pr-6 lg:pr-12 pt-1.5 lg:pt-3">
              <div className="absolute -left-3 -top-1.5">
                <img src="/images/destinationPage/plane.png" alt="Plane" />
              </div>
              <img
                src="/images/destinationPage/Vector191.png"
                alt="Decorative vector"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationHero;
