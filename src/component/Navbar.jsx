// src/components/Navbar.jsx
import { useState } from "react";
import logo from "../assets/images/logo.svg";
import LinkNav from "./LinkNav";
import search from "../assets/images/search.svg";
import favorite from "../assets/icons/favorite.svg";
import Cart from "../assets/icons/cart.svg";
import ProfileDropdown from "./ProfileDropdown";
import { Link, useLocation } from "react-router-dom"; // ⬅️ added useLocation
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // Import useAuth for managing login state
import { useGetUserProfile } from "../api/use-get-user-data";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const { favorites } = useFavorites();
  const { cart } = useCart();
  const { user } = useAuth(); // ⬅️ only user needed here

  const location = useLocation(); // ⬅️ current route
  const isFavoritesActive = location.pathname.startsWith("/favorites");
  const isCartActive = location.pathname.startsWith("/carts");

  const { data: userProfile } = useGetUserProfile();

  console.log("user profile data", userProfile);

  return (
    <nav className="bg-[#F8F8F8] md:py-10">
      <div className="hidden w-[90%] justify-between md:flex items-center m-auto">
        <div className="flex items-center gap-x-2">
          <div className="bg-[#A1C249] p-[.27rem] rounded-[.57rem]">
            <img src={logo} alt="logo" className="w-auto aspect-square" />
          </div>
          <div className="flex flex-col gap-y-1">
            <h2 className="leading-[100%] font-medium md:font-bold text-[2.25rem] md:text-[2.25rem]">
              Velora.
            </h2>
            <p className="leading-[100%] font-normal text-[.5rem] ">
              Think forward, Spend Smarter
            </p>
          </div>
        </div>

        <LinkNav />

        <div className="flex gap-x-4 items-center w-1/3">
          <div className="bg-[#ECECEC] relative w-full rounded-[1.375rem]">
            <input
              type="search"
              placeholder="What are you looking for.....?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="focus:outline-none py-3 px-4 w-full font-normal text-[.75rem] leading-4.5"
            />
            <img
              src={search}
              alt=""
              className="w-4 aspect-square absolute right-5 bottom-3"
            />
          </div>

          {/* Favorites with active state */}
          <Link
            to="/favorites"
            className={`relative p-2 rounded-full shadow-2xl transition-colors ${
              isFavoritesActive ? "bg-[#A1C249]" : "bg-white"
            }`}
          >
            <img src={favorite} alt="favorite" className="w-7 aspect-square" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[0.625rem] font-bold rounded-full px-2 py-[0.12rem]">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Cart with active state */}
          <Link
            to="/carts"
            className={`relative p-2 rounded-full shadow-2xl transition-colors ${
              isCartActive ? "bg-[#A1C249]" : "bg-white"
            }`}
          >
            <img src={Cart} alt="cart" className="w-7 aspect-square" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[0.625rem] font-bold rounded-full px-2 py-[0.12rem]">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        {/* Conditional rendering */}
        {!user ? (
          <div className="flex gap-x-4">
            <Link to="/login" className="text-lime-500 font-semibold">
              Login
            </Link>
            <Link to="/create-account" className="text-lime-500 font-semibold">
              Sign up
            </Link>
          </div>
        ) : (
          <ProfileDropdown />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
