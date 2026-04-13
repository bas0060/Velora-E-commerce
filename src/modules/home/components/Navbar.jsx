// src/components/Navbar.jsx
import { useState } from "react";
import LinkNav from "./LinkNav";
import search from "@/assets/images/search.svg";
import favoriteIcon from "@/assets/icons/favorite.svg";
import CartIcon from "@/assets/icons/cart.svg";
import ProfileDropdown from "@/modules/home/components/ProfileDropdown";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Heart, Menu, ShoppingCart, LogIn, UserPlus, LogOut } from "lucide-react";
import DashboardSidebar from "@/modules/dashboard/components/DashboardSidebar";
import { LogoBlock } from "./LogoBlock";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const { favorites } = useFavorites();
  const { cart } = useCart();
  const { user } = useAuth();

  const location = useLocation();
  const isFavoritesActive = location.pathname.startsWith("/favorites");
  const isCartActive = location.pathname.startsWith("/carts");

  // Detect if we're inside the dashboard — determines which Sheet to render
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {/* ─── DESKTOP NAV (lg and above) — unchanged ─── */}
      <nav className="bg-[#F8F8F8] py-10 hidden lg:block">
        <div className="w-[90%] flex justify-between items-center m-auto">
          <LogoBlock />
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

            <Link
              to="/favorites"
              className={`relative p-2 rounded-full shadow-2xl transition-colors ${
                isFavoritesActive ? "bg-[#A1C249]" : "bg-white"
              }`}
            >
              <img src={favoriteIcon} alt="favorite" className="w-7 aspect-square" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[0.625rem] font-bold rounded-full px-2 py-[0.12rem]">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              to="/carts"
              className={`relative p-2 rounded-full shadow-2xl transition-colors ${
                isCartActive ? "bg-[#A1C249]" : "bg-white"
              }`}
            >
              <img src={CartIcon} alt="cart" className="w-7 aspect-square" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[0.625rem] font-bold rounded-full px-2 py-[0.12rem]">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {!user ? (
            <div className="flex gap-x-4">
              <Link to="/login" className="text-lime-500 font-semibold">Login</Link>
              <Link to="/create-account" className="text-lime-500 font-semibold">Sign up</Link>
            </div>
          ) : (
            <ProfileDropdown />
          )}
        </div>
      </nav>

      {/* ─── MOBILE + TABLET NAV (below lg) ─── */}
      <nav className="bg-[#F8F8F8] py-4 px-5 flex items-center justify-between lg:hidden">
        <LogoBlock />

        <div className="flex items-center gap-3">
          {/* Only show favorites + cart icons on non-dashboard routes */}
          {!isDashboard && (
            <>
              <Link
                to="/favorites"
                className={`relative p-2 rounded-full shadow transition-colors ${
                  isFavoritesActive ? "bg-[#A1C249]" : "bg-white"
                }`}
              >
                <img src={favoriteIcon} alt="favorite" className="w-6 aspect-square" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[0.55rem] font-bold rounded-full px-1.5 py-[0.1rem]">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link
                to="/carts"
                className={`relative p-2 rounded-full shadow transition-colors ${
                  isCartActive ? "bg-[#A1C249]" : "bg-white"
                }`}
              >
                <img src={CartIcon} alt="cart" className="w-6 aspect-square" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[0.55rem] font-bold rounded-full px-1.5 py-[0.1rem]">
                    {cart.length}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* Hamburger → Sheet (content swaps based on route) */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button className="p-2 bg-white rounded-md shadow">
                <Menu size={20} />
              </button>
            </SheetTrigger>

            {isDashboard ? (
              // ── DASHBOARD SHEET: sidebar from the left ──
              <SheetContent side="left" className="w-72 p-0 flex flex-col">
                {/* User header */}
                <div className="px-6 py-5 border-b bg-[#F8F8F8]">
                  {user ? (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#A1C249] flex items-center justify-center text-white font-bold text-sm uppercase">
                        {user?.username?.[0] ?? "U"}
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-gray-800 text-sm">{user?.username}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-xs text-gray-500">Online</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <h2 className="text-sm font-semibold text-gray-800">Dashboard</h2>
                  )}
                </div>

                {/* Sidebar nav — rendered in sheet mode (no hidden lg:flex) */}
                <div className="flex-1 overflow-y-auto">
                  <DashboardSidebar
                    sheetMode
                    onNavigate={() => setSheetOpen(false)}
                  />
                </div>
              </SheetContent>
            ) : (
              // ── WEBSITE SHEET: menu from the right ──
              <SheetContent side="right" className="w-72 p-0 flex flex-col">
                {/* User header */}
                <div className="px-6 py-5 border-b">
                  {user ? (
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-gray-800">{user?.username}</p>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        <span className="text-xs text-gray-500">Online</span>
                      </div>
                    </div>
                  ) : (
                    <h2 className="text-sm font-semibold text-gray-800">MENU</h2>
                  )}
                </div>

                {/* Search */}
                <div className="px-6 py-4 border-b">
                  <div className="bg-[#ECECEC] relative w-full rounded-[1.375rem]">
                    <input
                      type="search"
                      placeholder="What are you looking for.....?"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="focus:outline-none py-2.5 px-4 w-full font-normal text-[.75rem]"
                    />
                    <img
                      src={search}
                      alt=""
                      className="w-4 aspect-square absolute right-4 top-1/2 -translate-y-1/2"
                    />
                  </div>
                </div>

                {/* Nav links */}
                <nav className="flex-1 py-4 overflow-y-auto">
                  <Link to="/" onClick={() => setSheetOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-[#A1C249]/10 hover:text-[#A1C249]">
                    Home
                  </Link>
                  <Link to="/shop" onClick={() => setSheetOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-[#A1C249]/10 hover:text-[#A1C249]">
                    Shop
                  </Link>
                  <Link to="/favorites" onClick={() => setSheetOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-[#A1C249]/10 hover:text-[#A1C249]">
                    <Heart size={15} />
                    Favorites
                    {favorites.length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-[0.6rem] font-bold rounded-full px-2 py-0.5">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                  <Link to="/carts" onClick={() => setSheetOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-[#A1C249]/10 hover:text-[#A1C249]">
                    <ShoppingCart size={15} />
                    Cart
                    {cart.length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-[0.6rem] font-bold rounded-full px-2 py-0.5">
                        {cart.length}
                      </span>
                    )}
                  </Link>

                  {user ? (
                    <>
                      <Link to="/profile" onClick={() => setSheetOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-[#A1C249]/10 hover:text-[#A1C249]">My Profile</Link>
                      <Link to="/notifications" onClick={() => setSheetOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-[#A1C249]/10 hover:text-[#A1C249]">Notifications</Link>
                      <Link to="/settings" onClick={() => setSheetOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-[#A1C249]/10 hover:text-[#A1C249]">Settings</Link>
                      <Link to="/dashboard" onClick={() => setSheetOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-[#A1C249]/10 hover:text-[#A1C249]">Dashboard</Link>
                      <button
                        onClick={() => { setSheetOpen(false); /* trigger ConfirmLogoutModal */ }}
                        className="flex items-center gap-3 px-6 py-3 text-sm font-medium w-full text-left hover:bg-red-50 text-red-500"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setSheetOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-[#A1C249]/10 hover:text-[#A1C249]">
                        <LogIn size={15} /> Login
                      </Link>
                      <Link to="/create-account" onClick={() => setSheetOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-[#A1C249]/10 hover:text-[#A1C249]">
                        <UserPlus size={15} /> Sign Up
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            )}
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
