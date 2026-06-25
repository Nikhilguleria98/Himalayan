import React from 'react';

const Hero = ({ data }) => {
  return (
    <div className="relative w-full">
      <img
        src="/images/aboutimg/hero.png"
        alt={data?.heading || 'Hero Image'}
        className="w-full h-auto object-cover min-h-[230px]"
      />

      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl md:text-5xl font-bold">
        {data?.heading || 'Your Heading Here'}
      </h1>
    </div>
  );
};

export default Hero;
