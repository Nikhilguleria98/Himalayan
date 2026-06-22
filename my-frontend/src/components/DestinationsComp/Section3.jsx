import React from "react";

const Section3 = () => {
  return (
    <div className="h-full w-full relative">
      <div>
        <div className="absolute z-30 h-10 w-10 left-[15.4rem] md:left-[24.2rem] -top-[2rem]">
          <img
            className="w-full h-full object-cover"
            src="/images/destinationPage/paperplane.png"
            alt="vector"
          />
        </div>
        <div className="absolute z-30">
          <img
            className="w-64 md:w-full h-full object-cover"
            src="/images/destinationPage/Vector2.png"
            alt="vector"
          />
        </div>
      </div>

      <div className="h-auto md:h-[90vh] w-full bg-gradient-to-r from-[#dff6fd] to-[#c3e7f6] flex flex-col justify-between md:justify-normal md:flex-row md:px-6 md:pl-10 md:pr-0 relative overflow-hidden">
        {/* Left - Images */}
        <div className="relative w-full md:w-[40vw] flex items-center justify-center mt-5 md:mt-0">
          <div className="md:absolute w-48 h-60 md:w-[25vw] md:h-[22rem] rounded-[2vw] overflow-hidden md:top-[15rem] md:-translate-y-1/2 left-4 md:left-10 hover:scale-110 hover:z-40 cursor-pointer duration-1000 hover:rounded-[4vw]">
            <img
              className="w-full h-auto object-cover rounded-xl"
              src="/images/destinationPage/section3img1.png"
              alt="Cycling Adventure"
            />
          </div>

          <div className="md:absolute w-40 h-48 md:w-[18vw] md:h-[15rem] rounded-xl overflow-hidden md:top-[5rem] lg:top-[7rem] -translate-x-14 md:-translate-x-0 translate-y-14 md:translate-y-1/2 left-20 md:left-[20vw] z-10 hover:scale-110 hover:z-40 cursor-pointer duration-1000 hover:rounded-[4vw]">
            <img
              className="w-full h-auto object-cover"
              src="/images/destinationPage/section3img2.png"
              alt="Hand View"
            />
          </div>
        </div>

        {/* Right - Text and Content */}
        <div className="w-full md:w-[60%] flex flex-col justify-center text-left relative md:mt-0 md:px-5">
          <div className="w-full max-w-[40rem] mx-auto px-10 md:px-0">
            <h2 className="text-3xl sm:text-2xl md:text-4xl font-bold md:leading-snug">
              We are no. 1 Travel{" "}
              <span className="text-[#0C8699]">Company</span>
            </h2>

            <p className="leading-relaxed mt-2 text-md sm:text-lg md:text-[1.6vw]">
              At <span className="font-semibold text-[#0C8699]">Himalayan Khadu</span>, we believe every journey should tell a story.
              With 100+ handpicked destinations and 200+ happy travelers, we bring you closer to nature, culture, and unforgettable moments.
              From peaceful Himalayan valleys to thrilling mountain adventures, your perfect escape starts here — with us.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:0 sm:flex sm:flex-wrap md:justify-start space-x-6 md:space-x-8 my-4">
              <div className="h-[2.5rem] md:h-[3.5rem] lg:h-18">
                <img
                  src="/images/destinationPage/nako.png"
                  alt="nako"
                  className="h-full w-[20vw] sm:w-[15vw] md:w-[12vw]"
                />
              </div>
              <div>
                <h1 className="sm:text-center text-lg sm:text-xl md:text-[2vw] font-bold text-[#0C8699]">100+</h1>
                <p className="text-md sm:text-lg md:text-[1.6vw]">Destinations</p>
              </div>
              <div>
                <h1 className="sm:text-center text-lg sm:text-xl md:text-[2vw] font-bold text-[#0C8699]">200+</h1>
                <p className="text-md sm:text-lg md:text-[1.6vw]">Satisfied Customers</p>
              </div>
            </div>

            <button className="text-sm sm:text-md px-4 py-2 sm:px-6 sm:py-3 font-medium rounded-full text-white bg-[#0C8699] hover:bg-[#097480] transition duration-300 mb-5 md:mb-0">
              Book Your Trip
            </button>
          </div>

          <div className="h-[11rem] sm:h-48 md:h-64 w-full flex items-end justify-end absolute bottom-0">
            <img
              className="h-full md:w-[17vw] object-cover"
              src="/images/destinationPage/section3cycle.png"
              alt="Cyclist"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
