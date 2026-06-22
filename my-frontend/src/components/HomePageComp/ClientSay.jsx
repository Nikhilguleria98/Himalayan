import React, { useState, useEffect } from "react";

const ClientSay = () => {
  const [activeSlide, setActiveSlide] = useState(4);

  const testimonials = [
    {
      id: 1,
      text: "The Kashmir Great Lakes Trek was nothing short of surreal! Every turn revealed a new postcard view...",
      author: "Neha Sinha",
      trip: "Kashmir Great Lakes Trek",
      rating: 5,
    },
    {
      id: 2,
      text: "The Chandranahan Lake Trek was a dream! Snow patches, alpine meadows, and the crystal-clear lake...",
      author: "Ravi Jangra",
      trip: "Chandranahan Lake Trek",
      rating: 5,
    },
    {
      id: 3,
      text: "Tarsar Marsar Lake Trek stole my heart. The twin lakes are a hidden paradise...",
      author: "Meghna Kapoor",
      trip: "Tarsar Marsar Lake Trek",
      rating: 5,
    },
    {
      id: 4,
      text: "The Valley of Flowers Trek is every nature lover’s paradise...",
      author: "Tanmay Srivastava",
      trip: "Valley of Flowers Trek",
      rating: 5,
    },
    {
      id: 5,
      text: "Buran Ghati Trek tested my limits in the best way! The rappelling down the snow wall was thrilling...",
      author: "Kriti Deswal",
      trip: "Buran Ghati Trek",
      rating: 5,
    },
    {
      id: 6,
      text: "Kedarkantha Trek with Himalayan Khadu was the perfect intro to winter trekking...",
      author: "Arjun Pathak",
      trip: "Kedarkantha Trek",
      rating: 5,
    },
    {
      id: 7,
      text: "Har Ki Dun Trek was peaceful, scenic, and so fulfilling...",
      author: "Simran Paul",
      trip: "Har Ki Dun Trek",
      rating: 5,
    },
    {
      id: 8,
      text: "Sar Pass Trek blew my mind! The snow slide was the highlight of the trip...",
      author: "Rohit Meena",
      trip: "Sar Pass Trek",
      rating: 5,
    },
  ];

  const slidesPerView = 2;
  const totalSlides = Math.ceil(testimonials.length / slidesPerView);

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  const getVisibleTestimonials = () => {
    const startIndex = (activeSlide % totalSlides) * slidesPerView;
    return testimonials.slice(startIndex, startIndex + slidesPerView);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-[40px] md:text-[40px] font-medium font-poppins">
          What Our Clients Say <span className="text-teal-500">About Us</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {getVisibleTestimonials().map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-6xl text-blue-100 font-serif leading-none">
                &ldquo;
              </span>
              <div className="flex text-orange-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <p className="text-gray-800 mb-6">{testimonial.text}</p>

            <div className="flex items-center">
              <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden bg-teal-50 border-2 border-teal-100">
                <img
                  src="/placeholder.svg"
                  alt={testimonial.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  {testimonial.author}
                </h4>
                <p className="text-sm text-gray-600">{testimonial.trip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all ${
              activeSlide % totalSlides === index
                ? "bg-teal-500 w-3"
                : "bg-gray-300 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ClientSay;
