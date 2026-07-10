import React from 'react';
import Hero from '../../components/AboutComponents/Hero';
import CategoryPackagesSection from '../../components/PackagePageComp/CategoryPackagesSection';
import DestinationSlider from '../../components/DestinationsComp/DestinationSlider';
import Gallery from '../../components/CyclingComp/Gallery';
import Nexttrip from '../../components/CyclingComp/Nexttrip';
import Recommended from '../../components/CyclingComp/Recommended';
// import ClientSay from "../../components/HomePageComp/ClientSay";

const Herodata = {
  img_Src: "/images/Cyclingimg/Rectangle 1.png",
  heading: "Cycling Through Scenic Routes"
};

const CyclingPage = () => {
  return (
    <div>
      <Hero data={Herodata} />
      <CategoryPackagesSection
        tag="cycle"
        title="Cycling Tours"
        description="Explore scenic cycling routes with curated trips designed for adventure and comfort."
      />
      <Gallery />
      <Nexttrip />
      <Recommended />
      <DestinationSlider />
      {/* <ClientSay /> */}
    </div>
  );
};

export default CyclingPage;
