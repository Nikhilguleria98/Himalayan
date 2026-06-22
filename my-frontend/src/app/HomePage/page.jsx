"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../../components/HomePageComp/HeroSection";
import OurTrips from "../../components/HomePageComp/OurTrips";
import BookTour from "../../components/HomePageComp/BookTour";
import WhyHimalayan from "../../components/HomePageComp/WhyHimalayan";
import Blogs from "../../components/HomePageComp/Blogs";
import { fetchAllPackages } from "../../store/client/tourPackage-slice";

const Home = () => {
  const { packageList } = useSelector((state) => state.clientTourPackages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPackages());
  }, [dispatch]);

  const hasPackages = Array.isArray(packageList)
    ? packageList.length > 0
    : packageList && Object.keys(packageList).length > 0;

  return (
    <div className="w-full h-full flex flex-col">
      <HeroSection />
      {hasPackages && <OurTrips tripsData={packageList} />}
      <BookTour />
      <WhyHimalayan />
      <Blogs />
    </div>
  );
};

export default Home;
