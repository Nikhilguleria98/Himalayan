import React from 'react';
import Hero from '../../components/AboutComponents/Hero';
import ItineraryPage from '../../components/TrippageComp/ItineraryPage';
import BatchPricingInfo from '../../components/TrippageComp/BatchPricingInfo';
import DestinationSlider from '../../components/DestinationsComp/DestinationSlider';
import ClientSay from '../../components/HomePageComp/ClientSay';
import RelatedTrip from '../../components/TrippageComp/RelatedTrip';

const Herodata = {
  img_Src: '/images/Cyclingimg/Rectangle1.png',
};

const TripPage = () => {
  return (
    <div className="font-sans">
      <Hero data={Herodata} />
      <ItineraryPage />
      <BatchPricingInfo />
      <DestinationSlider />
      <ClientSay />
      <RelatedTrip />
    </div>
  );
};

export default TripPage;
