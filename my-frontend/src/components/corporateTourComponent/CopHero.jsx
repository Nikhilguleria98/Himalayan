import React from 'react';

const CopHero = () => {
  return (
    <div>
      <main className="responsivewidth mx-auto px-4 py-12 md:py-16 font-poppins">
        <div className="flex flex-col md:flex-row lg:justify-between gap-8 md:gap-16">
          {/* Text Content */}
          <div className="w-full md:w-[70vw] max-w-xl md:mt-8">
            <h1 className="text-3xl md:text-[42px] font-bold lg:leading-[4.5vw] md:mb-5">
              Team <span className="text-[#0C8699]">Bonding & Business </span>
              Beyond Borders
            </h1>
            <p className="text-[14px] font-normal">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>

          {/* Image Collage */}
          <div className="w-full md:w-auto relative md:h-[500px] md:-mt-10 gap-3 sm:gap-4 flex md:items-center justify-center">
            <div className="flex mb-[5vw]">
              <div className="w-[50vw] h-[50vw] md:w-[19vw] md:h-[24vw] overflow-hidden rounded-xl shadow-md">
                <img
                  src="/images/destinationPage/human.webp"
                  alt="Blue building with mural"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 md:gap-4 mt-5 md:mt-10">
              <div className="w-[28vw] h-[25vw] md:w-[12vw] md:h-[10vw] flex items-end overflow-hidden rounded-xl">
                <img
                  src="/images/destinationPage/human2.webp"
                  alt="Mountain village"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[35vw] h-[28vw] md:w-[15vw] md:h-[15vw] rounded-xl shadow-md overflow-hidden">
                <img
                  src="/images/destinationPage/human3.webp"
                  alt="Cyclists"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CopHero;
