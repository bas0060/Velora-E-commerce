import React from "react";
import { FavoritesProvider } from "./context/FavoritesContext";
import { Outlet } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import LatestOffers from "./component/LatestOffers";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const AppWrapper = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <Navbar />  
          <Outlet />
          <LatestOffers/>
          <Footer/>
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default AppWrapper;
