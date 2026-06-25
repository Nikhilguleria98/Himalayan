import React from 'react';

// Page Sections (modularized)
import Recommended from "../../components/CyclingComp/Recommended";
import Blogs from '../../components/HomePageComp/Blogs';
import Gallery from '../../components/CyclingComp/Gallery';
import WhyHimalayan from '../../components/HomePageComp/WhyHimalayan';
import FleetPage from '../../components/TransportComp/FleetPage';
// import ClientSay from '../../components/AboutComponents/ClientSay'; // Optional: Enable when ready

const Page = () => {
  return (
    <div className="font-sans">
      <FleetPage />
      <Recommended />
      <Gallery />
      {/* <ClientSay /> */}
      <WhyHimalayan />
      <Blogs />
    </div>
  );
};

export default Page;
