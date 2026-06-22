import React from "react";

const BookTour = () => {
  return (
    <div className="w-full h-full py-[4vw] md:py-0 relative">
      {/* Background top right image */}
      <div className="absolute hidden sm:flex -top-[4vw] right-0 w-[30vw] h-[10vw]">
        <img
          className="w-full h-full object-center object-cover"
          src="/images/HomePage/BGP2.png"
          alt="Decorative Background"
        />
      </div>

      {/* Main section */}
      <div className="w-full h-[95vw] sm:h-[35vw] relative flex flex-col items-center justify-center">

        {/* Text and CTA */}
        <div className="sm:absolute w-full sm:w-1/2 h-full sm:h-[10vw] sm:top-0 sm:left-1/2 sm:-translate-x-1/2 flex flex-col items-center sm:justify-center gap-[1vw]">
          <p className="text-xl sm:text-[2.5vw] font-semibold">
            Find And Book Your Tour{" "}
            <span className="text-[#0C8699]">Today!</span>
          </p>
          <button className="text-md px-4 py-1 z-10 sm:px-[1.5vw] sm:py-[0.5vw] sm:text-[1.2vw] font-medium rounded-full text-white bg-[#0C8699] hover:bg-[#097480] transition">
            Book Now!
          </button>
        </div>

        {/* Tour images */}
        <div className="absolute w-[30vw] z-20 top-[22vw] left-[15vw] h-[30vw] sm:w-[17vw] sm:h-[15vw] sm:top-[5vw] sm:left-[8vw] rounded-[0.5vw] rotate-[-10deg] overflow-hidden hover:scale-110 duration-1000 cursor-pointer hover:rounded-[3vw]">
          <img
            className="w-full h-full object-center object-cover"
            src="/images/HomePage/Tour1.png"
            alt="Tour 1"
          />
        </div>

        <div className="absolute w-[30vw] z-20 top-[22vw] right-[15vw] h-[30vw] sm:w-[17vw] sm:h-[15vw] sm:top-[5vw] sm:right-[8vw] rounded-[0.5vw] overflow-hidden hover:scale-110 duration-1000 cursor-pointer">
          <img
            className="w-full h-full object-center object-cover"
            src="/images/HomePage/Tour4.png"
            alt="Tour 4"
          />
        </div>

        <div className="absolute w-[30vw] z-20 top-[60vw] left-[15vw] h-[30vw] sm:w-[17vw] sm:h-[15vw] sm:top-[12vw] sm:left-[30vw] rounded-[0.5vw] rotate-[10deg] sm:rotate-[5deg] overflow-hidden hover:scale-110 duration-1000 cursor-pointer">
          <img
            className="w-full h-full object-center object-cover"
            src="/images/HomePage/Why3.png"
            alt="Why 3"
          />
        </div>

        <div className="absolute w-[30vw] z-20 top-[60vw] right-[15vw] h-[30vw] sm:w-[17vw] sm:h-[15vw] sm:top-[14vw] sm:left-[53vw] rounded-[0.5vw] rotate-[-10deg] overflow-hidden hover:scale-110 duration-1000 cursor-pointer">
          <img
            className="w-full h-full object-center object-cover"
            src="/images/HomePage/Tour2.png"
            alt="Tour 2"
          />
        </div>

        {/* Decorative left background */}
        <div className="absolute w-[35vw] h-[16vw] rounded-[0.5vw] top-[7vw] -left-[1vw] rotate-[-3deg] hidden sm:flex">
          <img
            className="w-full h-full object-center object-cover"
            src="/images/HomePage/BGP1.png"
            alt="Decorative Left Background"
          />
        </div>
      </div>
    </div>
  );
};

export default BookTour;
