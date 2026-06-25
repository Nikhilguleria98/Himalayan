import React from 'react';
import { Star } from 'lucide-react'; // Ensure lucide-react is installed via npm

const Hero = () => {
  const tours = [
    {
      id: 1,
      name: "Leh Ladakh Bike Trip From Srinagar",
      price: "₹12,500",
      reviews: 2,
      rating: 5,
    },
  ];

  return (
    <div className='responsivewidth mt-10 font-poppins'>
      <img src="/images/tripimg/triphero.png" alt="Trip Hero" className='min-h-[260px]' />
      <div className='flex justify-between mt-10 flex-wrap'>
        {tours.map((item) => (
          <React.Fragment key={item.id}>
            <div className='flex flex-col gap-2'>
              <h1 className='text-[4vw] sm:text-[3.2vw] md:text-[2.6vw] font-semibold text-wrap'>{item.name}</h1>
              <div className='flex items-center mt-1'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${i < item.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                      }`}
                  />
                ))}
                <span className='text-gray-500 text-sm ml-2'>
                  ({item.reviews} Reviews)
                </span>
              </div>
              <button className='px-[3.3vh] py-[2vh] w-32 bg-[#0C8699] text-white rounded-full text-sm'>
                Book Now!
              </button>
            </div>

            <div className='text-right'>
              <h2 className='text-[2.7vw] sm:text-[2vw] md:text-[1.7vw] text-[#9A9A9A]'>From</h2>
              <p className='text-[2.7vw] sm:text-[2vw] md:text-[1.7vw] text-[#0C8699] font-semibold'>{item.price}</p>
              <p className='text-[2.9vw] sm:text-[2.2vw] md:text-[1.9vw] text-[#0C8699] font-semibold'>(Per Person)</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Hero;
