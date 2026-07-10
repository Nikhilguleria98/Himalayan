import React from 'react';

// Page Sections (modularized)
import Recommended from "../../components/CyclingComp/Recommended";
import Blogs from '../../components/HomePageComp/Blogs';
import Gallery from '../../components/CyclingComp/Gallery';
import WhyHimalayan from '../../components/HomePageComp/WhyHimalayan';
import FleetPage from '../../components/TransportComp/FleetPage';
import CategoryPackagesSection from '../../components/PackagePageComp/CategoryPackagesSection';
// import ClientSay from '../../components/AboutComponents/ClientSay'; // Optional: Enable when ready

const Page = () => {
  return (
    <div className="font-sans">
      <FleetPage />
      <CategoryPackagesSection
        tag="transport"
        title="Transport Tours"
        description="Comfortable travel packages built around smooth transfers, convenience, and destination access."
      />
      <Recommended />
      <Gallery />
      {/* <ClientSay /> */}
      <WhyHimalayan />
      <Blogs />
    </div>
  );
};

export default Page;
