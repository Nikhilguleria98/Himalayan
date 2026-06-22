import React from 'react';

const Memory = () => {
  return (
    <div className="relative w-full">
      <img
        src="/images/aboutimg/memoimg.png"
        alt="Beautiful mountain memory background"
        className="w-full h-auto min-h-32 object-cover"
      />
      <div className="absolute top-1/2 left-[5%] transform -translate-y-1/2">
        <h3 className="text-[5vw] sm:text-[3vw] md:text-[2.5vw] font-bold text-white">
          Want to make Beautiful memories?
        </h3>
        <button className="bg-[#0C8699] px-6 py-2 rounded-full mt-4 text-sm text-white hover:bg-[#0b7486] transition">
          Get in touch with us Today!
        </button>
      </div>
    </div>
  );
};

export default Memory;
