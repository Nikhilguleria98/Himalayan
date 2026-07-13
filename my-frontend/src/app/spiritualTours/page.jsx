import DestinationSlider from "../../components/DestinationsComp/DestinationSlider";
// import ClientSay from "../../components/HomePageComp/ClientSay";
import Blogs from "../../components/HomePageComp/Blogs";
import WhyHimalayan from "../../components/HomePageComp/WhyHimalayan";
import CategoryPackagesSection from "../../components/PackagePageComp/CategoryPackagesSection";

const SpiritualTours = () => {
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

      <CategoryPackagesSection
        tag="spiritual"
        title="Spiritual Tours"
        description="Quiet, meaningful journeys that blend pilgrimage, reflection, and Himalayan beauty."
      />

      <DestinationSlider />
      {/* <ClientSay /> */}
      <WhyHimalayan />
      <Blogs />
    </div>
  );
};

export default SpiritualTours;
