// src/modules/dashboard/components/DashboardNavbar.jsx
import { useState } from "react";
import logo from "@/assets/images/logo.svg";
import searchIcon from "@/assets/images/search.svg";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
// import { DashboardNavbar } from "@/modules/dashboard/components/DashboardNavbar";

const DashboardNavbar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { user } = useAuth();

  return (
    // Only visible on mobile + tablet. Desktop sidebar handles its own layout.
    <div className=" bg-[#F8F8F8] shadow-sm">

      {/* ── Row 1: Logo + Hamburger ── */}
      <div className="flex items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-x-2">
            <div className="bg-[#A1C249] p-[.27rem] rounded-[.57rem]">
              <img src={logo} alt="logo" className="w-auto aspect-square" />
            </div>
            <div className="flex flex-col gap-y-1">
              <h2 className="leading-[100%] font-bold text-[1.75rem]">Velora.</h2>
              <p className="leading-[100%] font-normal text-[.5rem] text-gray-500">
                Think forward, Spend Smarter
              </p>
            </div>
          </div>
        </Link>

        {/* Hamburger → Sheet (slides from left) */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button className="p-2 bg-white rounded-md shadow">
              <Menu size={20} />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 p-0 flex flex-col">
            {/* Sheet header — user info */}
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
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    onClick={() => setSheetOpen(false)}
                    className="text-sm font-semibold text-[#A1C249]"
                  >
                    Login
                  </Link>
                  <span className="text-gray-300">/</span>
                  <Link
                    to="/create-account"
                    onClick={() => setSheetOpen(false)}
                    className="text-sm font-semibold text-[#A1C249]"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar content — your existing sidebar component.
                Pass onNavigate so each link closes the sheet. */}
            <div className="flex-1 overflow-y-auto">
              <DashboardNavbar onNavigate={() => setSheetOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* ── Row 2: Search bar (always visible, never inside the sheet) ── */}
      {/* <div className="px-5 pb-4">
        <div className="bg-[#ECECEC] relative w-full rounded-[1.375rem]">
          <input
            type="search"
            placeholder="What are you looking for.....?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="focus:outline-none py-3 px-4 w-full font-normal text-[.75rem] bg-transparent"
          />
          <img
            src={searchIcon}
            alt="search"
            className="w-4 aspect-square absolute right-5 top-1/2 -translate-y-1/2"
          />
        </div>
      </div> */}

    </div>
  );
};

export default DashboardNavbar;
