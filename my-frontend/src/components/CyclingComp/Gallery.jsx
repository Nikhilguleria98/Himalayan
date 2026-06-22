import React from "react";

const Gallery = () => {
  const images = [
    { src: "/images/Cyclingimg/Rectangle 4559.png", alt: "Cyclists" },
    { src: "/images/Cyclingimg/Rectangle 4565.png", alt: "Mountain View" },
    { src: "/images/Cyclingimg/Rectangle 4567.png", alt: "Graffiti Art" },
    {
      src: "/images/Cyclingimg/Rectangle 4568.png",
      alt: "Snowy Village",
      overlay: "+12 Photos",
    },
  ];

  return (
    <div className="flex justify-center items-center w-full px-4 mt-10">
      <div className="max-w-screen-xl w-full text-center">
        <h2 className="text-2xl font-semibold text-teal-600 mb-6">
          Our Gallery
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
          {/* Left side image */}
          <div className="h-[60vh] md:h-[40vw]">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

          {/* Right side images */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={images[1].src}
                alt={images[1].alt}
                className="w-full h-[30vh] md:h-[20vw] object-cover rounded-lg shadow-lg"
              />
              <img
                src={images[2].src}
                alt={images[2].alt}
                className="w-full h-[30vh] md:h-[20vw] object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Bottom image with overlay */}
            <div className="relative h-[25vh] md:h-[19vw]">
              <img
                src={images[3].src}
                alt={images[3].alt}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
              {images[3].overlay && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold rounded-lg">
                  {images[3].overlay}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
