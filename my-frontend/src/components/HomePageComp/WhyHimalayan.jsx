import React, { useState } from "react";

const WhyHimalayan = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="w-full h-full p-[4vw] md:p-0 md:px-[4vw] relative">
      <div className="w-full h-full gap-[3vw] flex flex-col md:flex-row relative">
        {/* Left Section */}
        <div className="w-full h-full py-[2vw] flex flex-col gap-2 md:gap-[1vw]">
          <h1 className="text-xl md:text-[2.5vw] font-semibold">
            Why <span className="text-[#0C8699]">Himalayan Khadu?</span>
          </h1>
          <p className="text-md md:text-[1.1vw]">
            "If you're not chasing dreams, are you even truly living?" <br />
            When Himalayan Khadu began its journey, it wasn't just about
            travel—it was about making dreams come alive. From the very first
            trek, we set out to be the link between wanderers and the wild,
            unexplored beauty of the Himalayas. <br />
            With over 7 years of experience and a mission to build a tribe of
            adventure seekers, Himalayan Khadu proudly stands as a trusted
            companion for those who crave the thrill of the mountains and the
            warmth of a like-minded community.
            {showMore && (
              <>
                <br />
                <br />
                With over 50,000 happy travelers, more than 10,000 successful
                trips, and access to 50+ breathtaking destinations, Himalayan
                Khadu has proudly turned countless travel dreams into lasting
                memories. Backed by the trust and enthusiasm of our growing
                community, we’ve emerged as a leading name in crafting
                exceptional adventures for nature lovers and thrill-seekers.
                <br />
                <br />
                As a registered member of ATOAI (Adventure Tour Operators
                Association of India), we prioritize your safety above all. Our
                trip leaders are not only passionate adventurers but also
                certified professionals—trained under AMC & BMC programs and
                equipped with first-aid expertise—ensuring that every journey is
                both exciting and secure.
                <br />
                <br />
                At Himalayan Khadu, we aren’t just planning trips—we’re building
                a community of passionate explorers, united by a love for the
                mountains and meaningful experiences. Every step we’ve taken has
                been guided by your support, the beauty of the Himalayas, and our
                shared passion for travel.
                <br />
                <br />
                From our very first trail to the ones we’re yet to
                explore—everything we do is for the community, the mountains, and
                the magic of the journey.
                <br />
                <br />
                So… why wait? The mountains are calling.
              </>
            )}
          </p>
          <button
            className="text-[#0C8699] underline text-sm md:text-[1vw] w-fit mt-1"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "View Less" : "View More"}
          </button>

          {/* Stats Section */}
          <div className="w-full h-full">
            <div className="flex p-2 md:p-[1vw] justify-between md:pr-[10vw]">
              <div>
                <h1 className="text-center text-2xl md:text-[2vw] font-bold text-[#0C8699]">
                  100+
                </h1>
                <p className=" text-md md:text-[1.6vw]">Destinations</p>
              </div>
              <div>
                <h1 className="text-center text-2xl md:text-[2vw] font-bold text-[#0C8699]">
                  200+
                </h1>
                <p className="text-md md:text-[1.6vw]">Satisfied Customers</p>
              </div>
            </div>
            <div className="flex p-[1vw] justify-between md:pr-[10vw]">
              <div className="w-full h-full flex flex-col items-start justify-center">
                <h1 className="text-center text-2xl md:text-[2vw] font-bold text-[#0C8699]">
                  4+ Years
                </h1>
                <p className="text-md md:text-[1.6vw]">Experience</p>
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-center text-2xl md:text-[2vw] font-bold text-[#0C8699]">
                  50+
                </h1>
                <p className="text-md md:text-[1.6vw]">Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-[70vw] md:h-full flex justify-end p-[5vw]">
          <div className="absolute w-[35vw] h-[32vw] md:w-[14vw] md:h-[13vw] overflow-hidden left-0 md:left-2/12 top-5/12 md:top-3/12 z-20 rounded-[1vw] hover:z-40 cursor-pointer hover:scale-110 duration-1000">
            <img
              className="w-full h-full object-cover object-center"
              src="/images/HomePage/IMG_0764.webp"
              alt="himalayan 1"
            />
          </div>
          <div className="w-[70vw] h-[60vw] md:w-[28vw] md:h-[25vw] overflow-hidden rounded-[1vw] hover:z-40 cursor-pointer hover:scale-110 duration-1000">
            <img
              className="w-full h-full object-cover object-center"
              src="/images/HomePage/IMG_0261.webp"
              alt="himalayan 2"
            />
          </div>
          <div className="absolute w-[60vw] h-[50vw] md:w-[24vw] md:h-[20vw] overflow-hidden bottom-0 left-1/12 md:left-3/12 z-10 rounded-[1vw] hover:z-40 cursor-pointer hover:scale-110 duration-1000">
            <img
              className="w-full h-full object-cover object-center"
              src="/images/HomePage/IMG_0320.webp"
              alt="himalayan 3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyHimalayan;
