import React from 'react';

export default function AboutSection() {
  return (
    <div className="responsivewidth py-12 md:py-16 lg:py-20 h-fit">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {/* Left content */}
        <div className="w-full md:w-1/2 max-w-2xl mx-auto space-y-4 text-center md:text-left">
          <h2 className="text-[4vh] md:text-[5vh] font-bold">
            <span className="text-[#0C8699]">About</span> Himalayan Khadu
          </h2>
          <p className="text-gray-700 leading-relaxed text-[2.4vh] sm:text-[2.8vh] md:text-[2.6vh] sm:text-base">
            <strong>"Where passion meets the peaks!"</strong>
            <br />
            <br />
            At Himalayan Khadu, we believe that the mountains are more than just a destination—they're an emotion. Born from a love for the wild, untouched beauty of the Himalayas, our goal is to connect every traveler with the raw, soul-refreshing magic of nature.
            With years of trekking and travel experience under our belts, we’re not just another tour operator—we’re a community of explorers, dreamers, and mountain lovers. From thrilling high-altitude treks to peaceful nature escapes, every journey we curate is designed to awaken your spirit and challenge your limits.
            <br />
            <br />
            Safety, sustainability, and unforgettable experiences are at the heart of everything we do. Our certified trek leaders, thoughtful itineraries, and local insights ensure that you get the best of adventure—with none of the stress.
            So whether you’re a first-time trekker or a seasoned mountaineer, Himalayan Khadu is your trusted companion in the mountains.
            <br />
            <br />
            Let’s wander where the Wi-Fi is weak and the connection is real.
          </p>
          <div className="pt-4">
            <button className="bg-[#0C8699] text-white rounded-full px-6 py-2">Book Your Trip</button>
          </div>
        </div>

        {/* Right images */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center h-[60vh] md:h-[70vh]">
          <img
            src="/images/aboutimg/Group.png"
            alt=""
            className="absolute w-full h-full object-cover top-[10%] right-[10%]"
          />

          <div className="relative w-[90vw] max-w-xl h-full flex justify-center items-center">
            <div className="absolute top-[18%] sm:top-[14%] left-[30%] transform -translate-x-1/2 sm:left-[30%] md:left-[30%] 
              w-[37vw] sm:w-[27vw] md:w-[19vw] rounded-lg overflow-hidden rotate-[5deg] z-20 transition-all duration-300 
              hover:z-[100] hover:scale-110 will-change-transform">
              <img src="/images/aboutimg/aboutimg.png" alt="Himalayan guide" className="object-cover w-full h-full" />
            </div>

            <div className="absolute top-[33%] sm:top-[32%] right-[25%] sm:right-[28%] md:right-[22%] 
              w-[49vw] sm:w-[39vw] md:w-[26vw] rounded-lg overflow-hidden transform -rotate-[5deg] z-10 transition-all duration-300 
              hover:z-[100] hover:scale-110 will-change-transform">
              <img src="/images/aboutimg/aboutimg3.png" alt="Scenery" className="object-cover w-full h-full" />
            </div>

            <div className="absolute top-[55%] sm:top-[57%] right-[15%] sm:right-[12%] md:right-[3%] 
              w-[37vw] sm:w-[32vw] md:w-[19vw] rounded-lg overflow-hidden z-15 transition-all duration-300 
              hover:z-[100] hover:scale-110 will-change-transform">
              <img src="/images/aboutimg/aboutimg2.png" alt="I love NAKO sign" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
