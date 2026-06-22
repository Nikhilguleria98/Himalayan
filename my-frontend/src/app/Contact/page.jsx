import React, { useState } from "react";
import { MapPin, Phone, Mail, ChevronDown } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    trip: "",
    location: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Hero Section */}
      <div
        style={{
          minHeight: "calc(100vh - 134px)",
        }}
        className="flex contactPageHeroImage w-full justify-center items-center bg-blend-multiply bg-black/30"
      >
        <div className="text-center justify-start text-white text-[64px] font-bold font-poppins">
          Contact Us Today!
        </div>
      </div>

      {/* Google Maps Background */}
      <div className="relative">
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: "url('/assets/contact/bgMap.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="relative z-10 responsivewidth mx-auto pt-10 px-4">
          {/* Header */}
          <h1 className="text-black text-[40px] font-semibold text-center font-poppins mb-10">
            Your next <span className="text-[#0099cc]">Adventure</span> is just
            a Call away!
          </h1>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex gap-3 items-center">
                <MapPin className="text-[#0099cc]" size={40} />
                <h3 className="mb-2 justify-start text-black text-3xl font-semibold font-poppins">
                  Visit us
                </h3>
              </div>
              <p className="self-stretch justify-start text-black text-xl font-normal font-poppins">
                Himlayan Khadu 16 Miles, Shimla-Mandi National Highway, Ghandal,
                District Shimla, Himachal Pradesh-171014.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex gap-3 items-center">
                <Phone className="text-[#0099cc]" size={40} />
                <h3 className="mb-2 justify-start text-black text-3xl font-semibold font-poppins">
                  Call us at
                </h3>
              </div>
              <p className="self-stretch justify-start text-black text-xl font-normal font-poppins">
                +91 7876750072
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex gap-3 items-center">
                <Mail className="text-[#0099cc]" size={40} />
                <h3 className="mb-2 justify-start text-black text-3xl font-semibold font-poppins">
                  Email us
                </h3>
              </div>
              <p className="self-stretch justify-start text-black text-xl font-normal font-poppins">
                Himlyankhadu@gmail.com
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg border-2 border-gray-100 relative top-40">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Your Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-full border-[#0099cc] border-opacity-30 focus:outline-none focus:ring-1 focus:ring-[#0099cc]"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#0099cc] border-opacity-30 rounded-full focus:outline-none focus:ring-1 focus:ring-[#0099cc]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#0099cc] border-opacity-30 rounded-full focus:outline-none focus:ring-1 focus:ring-[#0099cc]"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone No"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#0099cc] border-opacity-30 rounded-full focus:outline-none focus:ring-1 focus:ring-[#0099cc]"
                  required
                />
              </div>

              <div className="relative">
                <select
                  name="trip"
                  value={formData.trip}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#0099cc] border-opacity-30 rounded-full focus:outline-none focus:ring-1 focus:ring-[#0099cc] appearance-none"
                  required
                >
                  <option value="" disabled>
                    Select Your Trip
                  </option>
                  <option value="adventure">Adventure Trip</option>
                  <option value="hiking">Hiking Trip</option>
                  <option value="camping">Camping Trip</option>
                  <option value="safari">Safari Trip</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0099cc]"
                  size={20}
                />
              </div>

              <div className="relative">
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#0099cc] border-opacity-30 rounded-full focus:outline-none focus:ring-1 focus:ring-[#0099cc] appearance-none"
                  required
                >
                  <option value="" disabled>
                    Select a Location
                  </option>
                  <option value="mountains">Mountains</option>
                  <option value="beach">Beach</option>
                  <option value="forest">Forest</option>
                  <option value="desert">Desert</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0099cc]"
                  size={20}
                />
              </div>

              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border border-[#0099cc] border-opacity-30 rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#0099cc]"
                required
              ></textarea>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#0099cc] text-white px-6 py-2 rounded-full hover:bg-[#007aa3] transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* map */}
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.9999999999995!2d144.9630579153186!3d-37.81410797975146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f0f0f0f%3A0x0!2zMzdcwqAwJzE5LjgiUyAxNDTCsDUyJzEwLjAiRQ!5e0!3m2!1sen!2sin!4v1631234567890"
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Maps Location"
        ></iframe>
      </div>
    </div>
  );
}
