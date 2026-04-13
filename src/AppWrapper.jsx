import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/modules/home/components/Navbar";
import Footer from "@/modules/home/components/Footer";
import LatestOffers from "@/modules/home/components/LatestOffers";

const AppWrapper = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <LatestOffers />
      <Footer />
    </>
  );
};

export default AppWrapper;
