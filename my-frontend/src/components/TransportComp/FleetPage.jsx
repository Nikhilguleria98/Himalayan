import React from "react";

const FleetPage = () => {
  return (
    <div className="px-6 py-10 md:px-20 md:py-16 font-sans">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Efficient Fleet for <br />
            Seamless <span className="text-cyan-600">Travel Experiences</span>
          </h2>
          <p className="mt-6 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
          </p>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-80 md:h-[400px]">
          <div className="absolute top-0 left-0 w-2/3 h-full">
            <img
              src="/images/TransportComp/Rectangle 16.png"
              alt="Biker riding in mountains"
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 overflow-hidden rounded-lg">
            <img
              src="/images/TransportComp/Rectangle 17.png"
              alt="Scenic road"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Vehicles Section */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold mb-8">
          Explore Our <span className="text-cyan-600">Vehicles</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🚗", label: "Car Tours" },
            { icon: "🚌", label: "Tempo Travellers" },
            { icon: "🏍️", label: "Bike Trips" },
            { icon: "🚴", label: "Cycling Trips" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="text-4xl mb-3">{icon}</div>
              <p className="text-sm md:text-base font-medium text-gray-700">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FleetPage;
