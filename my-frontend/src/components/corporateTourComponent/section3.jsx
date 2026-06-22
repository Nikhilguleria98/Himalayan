import React from 'react';

const Section3 = () => {
  const data = [
    {
      id: 1,
      para:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      id: 2,
      para:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      id: 3,
      para:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      id: 4,
      para:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      id: 5,
      para:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
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
