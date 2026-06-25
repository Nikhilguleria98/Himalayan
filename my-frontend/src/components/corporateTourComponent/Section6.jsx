import React, { useRef } from "react";
import { Star } from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Section6 = () => {
  const tours = [
    {
      id: 1,
      name: "Chandra Nahan Lake Trek",
      price: "₹12,500",
      reviews: 2,
      rating: 5,
      image: "/assets/spiritualTours/img3.png",
    },
    {
      id: 2,
      name: "Chandra Nahan Lake Trek",
      price: "₹12,500",
      reviews: 2,
      rating: 5,
      image: "/assets/spiritualTours/img3.png",
    },
    {
      id: 3,
      name: "Chandra Nahan Lake Trek",
      price: "₹12,500",
      reviews: 2,
      rating: 5,
      image: "/assets/spiritualTours/img3.png",
    },
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 400;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="responsivewidth font-poppins mt-10">
      <h1 className="text-center text-[4vh] md:text-[5vh] font-bold">
        Our Yatra <span className="text-[#0C8699]">Packages</span>
      </h1>
      <div className="mt-10">
        <div
          ref={scrollRef}
          className="flex space-x-6 py-4 pl-4 scroll-smooth overflow-x-hidden"
        >
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="min-w-[200px] md:min-w-[360px] flex flex-col md:flex-row items-start md:space-x-4 p-4 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.1)] bg-white"
            >
              <div className="md:flex-shrink-0">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-[170px] md:w-32 h-24 rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col md:gap-2">
                <h3 className="font-semibold text-[14px]">{tour.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-[12px]">Starting From:</span>
                  <span className="text-[#0C8699] font-semibold ml-1 text-[14px]">
                    {tour.price}
                  </span>
                </div>
                <div className="flex md:gap-1 items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < tour.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-gray-500 text-[13px] ml-2">
                    ({tour.reviews} Reviews)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Buttons */}
        <div className="flex justify-center mt-4 space-x-4 text-white">
          <button
            onClick={() => scroll("left")}
            className="p-3 bg-[#0C8699] rounded-full"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 bg-[#0C8699] rounded-full"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section6;
