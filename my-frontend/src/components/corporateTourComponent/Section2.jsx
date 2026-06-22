import React from 'react';

const Section2 = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-white to-[#ecf8ff] font-poppins md:pb-20">
        <h2 className="text-center text-[4vw] md:text-[2vw] font-bold mb-5 md:mb-14">
          What Activities We <span className="text-[#0C8699]"> Offer?</span>
        </h2>

        {/* Desktop Image */}
        <div className="hidden md:block">
          <img src="/images/destinationPage/section2Cop.png" alt="Activities Overview" />
        </div>

        {/* Mobile Cards */}
        <div className="px-6 flex flex-wrap gap-4 justify-center md:hidden">
          <div className="flex justify-center gap-4">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 overflow-hidden">
                <img src="/images/destinationPage/fire.png" alt="Communication Activities" />
              </div>
              <p className="text-[12px] text-center">
                Communication <br /> Activities
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 overflow-hidden">
                <img src="/images/destinationPage/adventure.png" alt="Adventure Activities" />
              </div>
              <p className="text-[12px] text-center">
                Adventure <br /> Activities
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 overflow-hidden">
                <img src="/images/destinationPage/team.png" alt="Team Building Activities" />
              </div>
              <p className="text-[12px] text-center">
                Team Building <br /> Activities
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 overflow-hidden">
                <img src="/images/destinationPage/walk.png" alt="Nature Walk" />
              </div>
              <p className="text-[12px] text-center">
                Nature <br /> walk
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
