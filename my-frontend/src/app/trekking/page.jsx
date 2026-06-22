import React from 'react';
import TrekkingHero from '../../components/TrekkingComp/TrekkingHero';
import DestinationSlider from '../../components/DestinationsComp/DestinationSlider';
import Nexttrip from '../../components/CyclingComp/Nexttrip';
import Recommended from '../../components/CyclingComp/Recommended';
import ClientSay from '../../components/HomePageComp/ClientSay';
import Blogs from '../../components/HomePageComp/Blogs';

const TrekkingPage = () => {
  return (
    <div className="font-sans">
      <TrekkingHero />
      <Nexttrip />
      <Recommended />
      <DestinationSlider />
      <ClientSay />
      <Blogs />
    </div>
  );
};

export default TrekkingPage;
