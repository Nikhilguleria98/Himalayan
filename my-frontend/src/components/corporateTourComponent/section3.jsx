import React from 'react';

const Section3 = () => {
  const data = [
    {
      id: 1,
      para:
        "Tailored itineraries for leadership retreats, incentive trips, and offsite planning that fit your team's goals.",
    },
    {
      id: 2,
      para:
        "Comfort-first travel support with premium stays, smooth transfers, and attentive local coordination from start to finish.",
    },
    {
      id: 3,
      para:
        "A perfect balance of adventure, wellness, and cultural immersion set against the beauty of the Himalayas.",
    },
    {
      id: 4,
      para:
        "Flexible options for small teams, large groups, and multi-day programs with clear budgeting and planning support.",
    },
    {
      id: 5,
      para:
        "Safety-led travel experiences backed by experienced hosts, trusted local guides, and dependable on-ground support.",
    },
  ];

  return (
    <>
      <div className="responsivewidth md:p-0 p-5 flex md:flex-row-reverse flex-col justify-center items-center gap-12 my-16 font-poppins">
        <div className="w-full md:w-1/2">
          <h1 className="text-[4vh] md:text-[5vh] font-bold mb-6">
            <span className="text-black">Why Our Clients </span>
            <span className="text-teal-500">Adore Us?</span>
          </h1>
          {data.map((item) => (
            <ul key={item.id} className="custom-list">
              <li className="mt-5 list-disc marker:text-teal-500">{item.para}</li>
            </ul>
          ))}
        </div>

        <div className="w-full md:w-1/2 relative">
          <div className="relative z-10">
            <img
              src="/assets/biketour/img1.png"
              alt="Buddhist stupa with prayer flags"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          <div className="absolute bottom-[-40px] right-[-20px] z-10">
            <img
              src="/assets/biketour/img2.png"
              alt="Buddhist temple"
              className="w-[50vw] md:w-64 h-auto rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Section3;
