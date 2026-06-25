import React from 'react';
import Hero from '../../components/tripPageComponents/Hero';
import ItineraryPage from '../../components/TrippageComp/ItineraryPage';
import BatchPricingInfo from '../../components/TrippageComp/BatchPricingInfo';
import DestinationSlider from '../../components/DestinationsComp/DestinationSlider';
import ClientSay from '../../components/HomePageComp/ClientSay';
import RelatedTrip from '../../components/TrippageComp/RelatedTrip';

const TripPage = () => {
  return (
    <div className="font-sans">
      <Hero />
      <ItineraryPage />
      <BatchPricingInfo />
      <DestinationSlider />
      <ClientSay />
      <RelatedTrip />
    </div>
  );
};

export default TripPage;
