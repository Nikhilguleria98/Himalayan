"use client";
import { Star, Clock } from "lucide-react";
import DestinationSlider from "../../components/DestinationsComp/DestinationSlider";
// import ClientSay from "../../components/HomePageComp/ClientSay";
import Blogs from "../../components/HomePageComp/Blogs";
import WhyHimalayan from "../../components/HomePageComp/WhyHimalayan";
import React, { useState } from "react";

const BikeTour = () => {
  return (
    <div className='responsivewidth px-4 py-12 font-sans'>
      {/* Hero Section */}
      <div className='flex flex-col justify-center items-center md:flex-row gap-8 mb-16'>
        <div className='w-full md:w-1/2'>
          <h1 className='text-5xl font-bold mb-6'>
            <span className='text-black'>Best Biking Trips in </span>{" "}
            <span className='text-teal-500'>India</span>
          </h1>
          <p className='text-gray-800 leading-relaxed'>
            Discover the thrill of two-wheeled adventures through the majestic landscapes of India. From the winding roads of the Himalayas to the scenic coastal routes of the South, our curated bike tours offer an unforgettable way to explore nature, culture, and hidden gems. Whether you're a seasoned rider or a curious traveler, each journey promises breathtaking views, vibrant local experiences, and the freedom of the open road. Let the mountains call you — and ride into a story worth telling.
          </p>
        </div>
        <div className='w-full md:w-1/2 relative'>
          <div className='relative z-10'>
            <Image
              src='/assets/biketour/img1.png'
              alt='Buddhist stupa with prayer flags'
              className='w-full h-auto rounded-lg object-cover'
              width={500}
              height={300}
            />
          </div>
          <div className='absolute bottom-[-40px] right-[-20px] z-10 hidden md:block'>
            <Image
              src='/assets/biketour/img2.png'
              alt='Buddhist temple'
              className='w-64 h-auto rounded-lg object-cover shadow-lg'
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>

      <TourBooking />
      <Recomended />
      <DestinationSlider />
      {/* <ClientSay /> */}
      <WhyHimalayan />
      <Blogs />
    </div>
  );
};

export default BikeTour;

const TourBooking = () => {
  const [activeLocation, setActiveLocation] = useState("All Tours");

  const locations = [
    "Uttarakhand",
    "Himachal Pradesh",
    "Sikkim",
    "Karnataka",
    "All Tours",
  ];

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
    {
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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

  const filteredTours =
    activeLocation === "All Tours"
      ? tours
      : tours.filter((tour) => tour.location === activeLocation);

  return (
    <div className='max-w-7xl mx-auto px-4 py-12 font-sans'>
      {/* Heading */}
      <h2 className='text-3xl md:text-4xl font-bold text-center mb-8'>
        Book Your <span className='text-teal-500'>Next Trip</span>
      </h2>

      {/* Location Filters */}
      <div className='flex flex-wrap justify-center gap-3 mb-8'>
        {locations.map((location) => (
          <button
            key={location}
            onClick={() => setActiveLocation(location)}
            className={`px-6 py-2 rounded-md text-sm transition-colors ${
              activeLocation === location
                ? "bg-teal-600 text-white"
                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {location}
          </button>
        ))}
      </div>

      {/* Tours Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {filteredTours.map((tour) => (
          <div
            key={tour.id}
            className='bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100'
          >
            
            <div className='relative' style={{ width: '100%' }}>
              <Image
                src={tour.image || '/assets/biketour/img2.png'}
                alt={tour.name}
                className='w-full h-48 object-cover'
                width={300} 
                height={192} 
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

            {/* /* Tour Details */} 
            <div className='p-4'>
              <div className='flex justify-between items-start mb-2'>
                <h3 className='font-semibold text-gray-900'>{tour.name}</h3>
                <span className='text-xs text-gray-500'>From</span>
              </div>

              {/* Duration */}
              <div className='flex items-center text-xs text-gray-600 mb-2'>
                <Clock size={14} className='mr-1' />
                <span>
                  {tour.nights} Nights, {tour.days} Days
                </span>
              </div>

              {/* Rating */}
              <div className='flex items-center mb-3'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className='text-yellow-400 fill-yellow-400'
                  />
                ))}
                <span className='text-xs text-gray-500 ml-1'>
                  ({tour.reviews} Reviews)
                </span>
              </div>

              {/* Price */}
              <div className='flex justify-end'>
                <span className='text-teal-500 font-bold text-xl'>
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

const Recomended = () => {
  const tours = [
    {
      id: 1,
      name: "Delhi Spiti Chandratal Manali Tour",
      location: "Himachal Pradesh",
      nights: 8,
      days: 9,
      price: 17999,
      reviews: 0,
      rating: 0,
      image: "",
      tag: "Trending",
    },
    {
      id: 2,
      name: "Chandigarh To Shimla Tour",
      location: "Himachal Pradesh",
      nights: 2,
      days: 3,
      price: 15500,
      reviews: 0,
      rating: 0,
      image: "",
      tag: "Trending",
    },
    {
      id: 3,
      name: "Shimla - Manali Tour",
      location: "Himachal Pradesh",
      nights: 5,
      days: 6,
      price: 18000,
      reviews: 0,
      rating: 0,
      image: "",
      tag: "New",
    },
    {
      id: 4,
      name: "Chandigarh Shimla Kinnaur Tour",
      location: "Himachal Pradesh",
      nights: 3,
      days: 4,
      price: 15500,
      reviews: 0,
      rating: 0,
      image: "",
      tag: "New",
    },
  ];
  
  

  return (
    <div className='max-w-7xl mx-auto px-4 py-12 font-sans'>
      {/* Heading */}
      <h2 className='text-3xl md:text-4xl font-bold text-center mb-8'>
        Recommended <span className='text-teal-500'>Trips</span>
      </h2>

      {/* Tours Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {tours.map((tour) => (
          <div
            key={tour.id}
            className='bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100'
          >
            {/* Tour Image with Tag */}
            <div className='relative' style={{ width: '100%' }}>
                    <Image
                    src={tour.image || '/assets/biketour/img2.png'}
                    alt={tour.name}
                    className='w-full h-48 object-cover'
                    width={300} // Added width property
                    height={192} // Added height property
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

                  {/* Tour Details */}
            <div className='p-4'>
              <div className='flex justify-between items-start mb-2'>
                <h3 className='font-semibold text-gray-900'>{tour.name}</h3>
                <span className='text-xs text-gray-500'>From</span>
              </div>

              {/* Duration */}
              <div className='flex items-center text-xs text-gray-600 mb-2'>
                <Clock size={14} className='mr-1' />
                <span>
                  {tour.nights} Nights, {tour.days} Days
                </span>
              </div>

              {/* Rating */}
              <div className='flex items-center mb-3'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className='text-yellow-400 fill-yellow-400'
                  />
                ))}
                <span className='text-xs text-gray-500 ml-1'>
                  ({tour.reviews} Reviews)
                </span>
              </div>

              {/* Price */}
              <div className='flex justify-end'>
                <span className='text-teal-500 font-bold text-xl'>
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
