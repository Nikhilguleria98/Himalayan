import React from "react";
import { Star } from "lucide-react";
import DestinationSlider from "../../components/DestinationsComp/DestinationSlider";
// import ClientSay from "../../components/HomePageComp/ClientSay";
import Blogs from "../../components/HomePageComp/Blogs";
import WhyHimalayan from "../../components/HomePageComp/WhyHimalayan";

const SpiritualTours = () => {
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

  return (
    <div className="responsivewidth px-0 py-12 font-sans">
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center md:flex-row gap-8 mb-16">
        <div className="w-full md:w-1/2">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-black">Spiritual</span>{" "}
            <span className="text-teal-500">Tours</span>
          </h1>
          <p className="text-gray-800 leading-relaxed">
            Discover peace and serenity amidst the majestic Himalayas with our specially curated spiritual tours...
          </p>
        </div>
        <div className="w-full md:w-1/2 relative">
          <div className="relative z-10">
            <img
              src="/assets/spiritualTours/img1.png"
              alt="Buddhist stupa with prayer flags"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          <div className="absolute bottom-[-40px] right-[-20px] z-10 hidden md:block">
            <img
              src="/assets/spiritualTours/img2.png"
              alt="Buddhist temple"
              className="w-64 h-auto rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Tours Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        {tours.map((tour) => (
          <div key={tour.id} className="flex items-start space-x-4 p-4 rounded-lg">
            <div className="flex-shrink-0">
              <img
                src={tour.image}
                alt={tour.name}
                className="w-32 h-24 rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg">{tour.name}</h3>
              <div className="flex items-center mt-1">
                <span className="text-gray-600 text-sm">Starting From:</span>
                <span className="text-teal-500 font-semibold ml-1">
                  {tour.price}
                </span>
              </div>
              <div className="flex items-center mt-1">
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
                <span className="text-gray-500 text-sm ml-2">
                  ({tour.reviews} Reviews)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DestinationSlider />
      {/* <ClientSay /> */}
      <WhyHimalayan />
      <Blogs />
    </div>
  );
};

export default SpiritualTours;
