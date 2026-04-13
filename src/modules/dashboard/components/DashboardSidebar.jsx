// src/modules/dashboard/components/DashboardSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Settings,
  ShoppingBag,
  BarChart2,
  CreditCard,
  MapPin,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Orders",       icon: ShoppingBag, path: "/dashboard/orders" },
  { label: "Transactions", icon: CreditCard,  path: "/dashboard/transactions" },
  { label: "Addresses",    icon: MapPin,      path: "/dashboard/addresses" },
  { label: "Analytics",   icon: BarChart2,   path: "/dashboard/analytics" },
  { label: "Profile",     icon: User,        path: "/dashboard/profile" },
  { label: "Settings",    icon: Settings,    path: "/dashboard/settings" },
];

/**
 * DashboardSidebar
 *
 * @param {boolean} sheetMode  - When true, removes `hidden lg:flex` so it renders
 *                               inside a Sheet on mobile/tablet. Defaults to false.
 * @param {function} onNavigate - Called after a nav link is clicked (used by Sheet
 *                                to close itself). Optional.
 */
const DashboardSidebar = ({ sheetMode = false, onNavigate }) => {
  return (
    <aside
      className={[
        "w-72 lg:w-65 shrink-0 lg:border-x lg:border-t rounded-lg border-gray-200 bg-white flex flex-col gap-6 py-8 lg:mx-6",
        // In normal layout: hidden on mobile/tablet, visible on desktop
        // In sheet mode: always visible (the Sheet handles show/hide)
        sheetMode ? "flex" : "hidden lg:flex",
      ].join(" ")}
    >
      {/* Section label */}
      <p className="px-6 text-[1rem] font-medium tracking-widest text-black uppercase">
        Account
      </p>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onNavigate} // closes Sheet on mobile when a link is tapped
            className={({ isActive }) =>
              [
                "flex items-center gap-3 px-4 lg:px-6 py-3 lg:py-4 text-sm font-medium transition relative",
                isActive
                  ? "bg-[#e4e4e4] text-black"
                  : "text-gray-600 hover:bg-[#e4e4e4] hover:w-full",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-[#A1C249] rounded-r-md" />
                )}
                <Icon size={20} strokeWidth={1.6} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
