import React from 'react';
import Section2 from '../../components/corporateTourComponent/Section2';
import Section3 from '../../components/corporateTourComponent/section3';
import CopHero from "../../components/corporateTourComponent/CopHero";
// import ClientSay from '../../components/HomePageComp/ClientSay';
import Section5 from '../../components/corporateTourComponent/section5';
import Section6 from '../../components/corporateTourComponent/Section6';
import Gallery from '../../components/CyclingComp/Gallery';
import Blogs from '../../components/HomePageComp/Blogs';
import GetinTouch from '../../components/corporateTourComponent/GetinTouch';

const CorporateTourPage = () => {
  return (
    <>
      <CopHero />
      <Section2 />
      <Section3 />
      {/* <ClientSay /> */}
      <Section5 />
      <Section6 />
      <Gallery />
      <GetinTouch />
      <Blogs />
    </>
  );
};

export default CorporateTourPage;
