import React from "react";
import AboutClub from "../components/AboutClub";
import Mission from "../components/Mission";
import History from "../components/History";
import Location from "../components/Location";
import Promotions from "../components/Promotions";
import Banner from "../components/Banner";
import HomePageHero from "../components/HomePageHero";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <HomePageHero />
      <Banner />
      <AboutClub />
      <Mission />
      <History />
      {/* <Gallery /> */}
      <Location />
      <Promotions />
    </div>
  );
}
