import React from 'react';

const Section2 = () => {
  const data = [
    {
      id: 1,
      name: "Duration",
      desc: "7 Days 6 Nights",
      img: "/images/tripimg/img1.png"
    },
    {
      id: 2,
      name: "Pickup & Drop",
      desc: "Guwahati to Guwahati",
      img: "/images/tripimg/route.png"
    },
    {
      id: 3,
      name: "Tour Category",
      desc: "Backpacking Trips",
      img: "/images/tripimg/optionslines.png"
    },
    {
      id: 4,
      name: "Group Size",
      desc: "Unlimited",
      img: "/images/tripimg/repeat.png"
    },
  ];

  return (
    <div className='responsivewidth grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 font-poppins mt-10'>
      {data.map((item) => (
        <div key={item.id} className='flex gap-2 border-[2px] border-[#0C869933] p-4 rounded-xl'>
          <div className='border-[2px] border-[#0C869933] p-2 rounded-xl'>
            <img src={item.img} alt={item.name} />
          </div>
          <div className='flex flex-col justify-between'>
            <h3 className='text-[4vw] sm:text-[3vw] md:text-[1.6vw] font-semibold text-[#0C8699]'>{item.name}</h3>
            <p className='text-[3.2vw] sm:text-[2vw] md:text-[1vw]'>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Section2;
