"use client";
import DestinationSlider from "../../components/DestinationsComp/DestinationSlider";
// import ClientSay from "../../components/HomePageComp/ClientSay";
import Blogs from "../../components/HomePageComp/Blogs";
import WhyHimalayan from "../../components/HomePageComp/WhyHimalayan";
import CategoryPackagesSection from "../../components/PackagePageComp/CategoryPackagesSection";

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
            <img
              src='/assets/biketour/img1.png'
              alt='Buddhist stupa with prayer flags'
              className='w-full h-auto rounded-lg object-cover'
              width={500}
              height={300}
            />
          </div>
          <div className='absolute bottom-[-40px] right-[-20px] z-10 hidden md:block'>
            <img
              src='/assets/biketour/img2.png'
              alt='Buddhist temple'
              className='w-64 h-auto rounded-lg object-cover shadow-lg'
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>

      <CategoryPackagesSection
        tag="bike"
        title="Bike Tours"
        description="Handpicked biking adventures tailored for riders who want to explore the mountains and scenic routes."
      />
      <DestinationSlider />
      {/* <ClientSay /> */}
      <WhyHimalayan />
      <Blogs />
    </div>
  );
};

export default BikeTour;

