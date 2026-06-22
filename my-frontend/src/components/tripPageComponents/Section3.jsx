import React from 'react';

const Section3 = () => {
  return (
    <>
      <div className='responsivewidth flex flex-col gap-10 mt-20 md:flex-row'>
        <div className='w-full md:w-1/2 flex flex-col justify-center'>
          <h2 className='text-[5vw] sm:text-[4vw] md:text-[3vw] font-semibold'>
            About this <span className='text-[#0C8699]'>Tour</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus eius a alias ipsum nihil aliquam. Porro quia omnis eos deleniti architecto corporis tempora magnam ea possimus tenetur. Laboriosam, eaque quaeratagnam ea possimus tenetur. Laboriosam, eaque quaeratagnam ea possimus tenetur. Laboriosam, eaque quaeratagnam ea possimus tenetur. Laboriosam, eaque quaeratagnam ea possimus tenetur. Laboriosam, eaque quaeratagnam ea possimus tenetur. Laboriosam, eaque quaerat!
          </p>
        </div>
        <div className='w-full md:w-1/2'>
          <img src="/images/tripimg/tripabout.png" alt="About Tour" />
        </div>
      </div>
    </>
  );
};

export default Section3;
