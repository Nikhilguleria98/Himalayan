import React from "react";
import { Clock, Star } from "lucide-react";
import DestinationSlider from "../../components/DestinationsComp/DestinationSlider";
// import ClientSay from "../../components/HomePageComp/ClientSay"
import WhyHimalayan from "../../components/HomePageComp/WhyHimalayan";
import Blogs from "../../components/HomePageComp/Blogs";

export default function Page() {
  return (
    <div>
      <Hero />
      <Recomended />
      <DestinationSlider />
      {/* <ClientSay /> */}
      <WhyHimalayan />
      <Blogs />
      {/* <Cards /> */}
    </div>
  );
}

const Hero = () => {
  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        {/* Text Content */}
        <div className="w-full md:w-1/2 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            A Journey of Discovery for{" "}
            <span className="text-teal-600">Young Minds</span>
          </h1>
          <p className="text-gray-700 leading-relaxed">
            Embark on an unforgettable adventure designed especially for
            students! Our Student Tours combine learning, exploration, and fun
            — all packed into one thrilling experience. Whether it's discovering
            new cultures, bonding with classmates, or stepping outside your
            comfort zone, every moment is crafted to inspire curiosity and
            create lasting memories. Perfect for educational trips, college
            getaways, or just a break from books, this journey promises
            excitement, knowledge, and friendship at every stop.
          </p>
        </div>

        {/* Image Collage */}
        <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
          {/* First image */}
          <div className="absolute top-0 left-0 md:left-40 w-[200px] h-[180px] rounded-lg overflow-hidden shadow-lg transform rotate-[9.23deg] z-10">
            <img
              src="/assets/biketour/img2.png"
              alt="Insurance qualways dreamt about"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Second image */}
          <div className="absolute top-[80px] right-[20px] md:right-[40px] w-[280px] h-[200px] bg-blue-200 rounded-lg shadow-lg transform rotate-[-4deg] z-0 overflow-hidden">
            <img
              src="/assets/spiritualTours/img1.png"
              alt="Landscape view"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Third image */}
          <div className="absolute top-[180px] right-[0px] w-[200px] h-[180px] rounded-lg overflow-hidden shadow-lg z-20 transform rotate-[10.89deg] md:bottom-[10px]">
            <img
              src="/assets/spiritualTours/img2.png"
              alt="I love Nako sign"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

const Recomended = () => {
  const tours = [
    {
      id: 1,
      name: "Har Ki Dun Trek",
      location: "Uttarakhand",
      nights: 5,
      days: 7,
      price: 12500,
      reviews: 3,
      rating: 5,
      image: "",
      tag: "Best Seller",
    },
    {
      id: 2,
      name: "Kedarnath Trek",
      location: "Uttarakhand",
      nights: 5,
      days: 7,
      price: 12500,
      reviews: 2,
      rating: 5,
      image: "",
      tag: "20% OFF",
    },
    {
      id: 3,
      name: "Kashmir Trek",
      location: "Kashmir",
      nights: 5,
      days: 7,
      price: 12500,
      reviews: 2,
      rating: 5,
      image: "",
    },
    {
      id: 4,
      name: "Chandra Nahan Lake Trek",
      location: "Himachal Pradesh",
      nights: 5,
      days: 7,
      price: 12500,
      reviews: 2,
      rating: 5,
      image: "",
      tag: "Best Seller",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Recommended <span className="text-teal-500">Trips</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
          >
            <div className="relative">
              <img
                src={tour.image || "/assets/biketour/img2.png"}
                alt={tour.name}
                className="w-full h-48 object-cover"
              />
              {tour.tag && (
                <div
                  className={`absolute top-3 left-3 py-1 px-3 rounded-md text-xs font-medium text-white ${
                    tour.tag === "Best Seller" ? "bg-teal-600" : "bg-blue-600"
                  }`}
                >
                  {tour.tag}
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{tour.name}</h3>
                <span className="text-xs text-gray-500">From</span>
              </div>

              <div className="flex items-center text-xs text-gray-600 mb-2">
                <Clock size={14} className="mr-1" />
                <span>
                  {tour.nights} Nights, {tour.days} Days
                </span>
              </div>

              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  ({tour.reviews} Reviews)
                </span>
              </div>

              <div className="flex justify-end">
                <span className="text-teal-500 font-bold text-xl">
                  ₹ {tour.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
