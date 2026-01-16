// src/components/ProfileDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth for logout

import profilePic from "../assets/images/jacketMan.svg";
import myprofile from "../assets/icons/myProfile.svg";
import previews from "../assets/icons/previews.svg";
import notification from "../assets/icons/notification.svg";
import settings from "../assets/icons/settings.svg";
import logoutIcon from "../assets/icons/logOut.svg";
import chevronUp from "../assets/icons/chevronUp.svg";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false); // ⬅️ new state
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth(); // Access user data and logout function

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setOpen(false);
    setShowConfirmLogout(true);
  };

  const confirmLogout = () => {
    setShowConfirmLogout(false);
    logout();
  };

  const cancelLogout = () => {
    setShowConfirmLogout(false);
  };

  const displayName = user?.fullName || user?.name || "Guest";

  return (
    <>
      <div className="relative z-50" ref={dropdownRef}>
        <div
          className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer select-none"
          onClick={() => setOpen(!open)}
        >
          <img
            src={user?.avatar || profilePic} // Use user avatar if available
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p
              className={`font-semibold transition-all duration-300 ${
                open ? "text-[#A1C249]" : "text-gray-700"
              }`}
            >
              {displayName}
            </p>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span
                className={`text-sm transition-all duration-300 ${
                  open ? "text-[#A1C249]" : "text-gray-500"
                }`}
              >
                {user ? "Online" : "Offline"}
              </span>
            </div>
          </div>
          <span className="ml- text-gray-600 transition-all duration-200">
            {open ? (
              <img src={chevronUp} alt="chevron up" />
            ) : (
              <img src={chevronUp} alt="chevron down" />
            )}
          </span>
        </div>

        <div
          className={`
          absolute right-0 mt-2 w-48 rounded-md bg-[#A1C249] shadow-md py-2
          transition-all duration-300 origin-top
          ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
        `}
        >
          <NavLink
            to="/profile"
            className="flex gap-x-2 items-center px-3 py-2 hover:bg-lime-200 rounded-md"
          >
            <img src={myprofile} className="w-4 h-4" />
            <span className="text-sm font-medium text-[#1A1A1A]">
              My Profile
            </span>
          </NavLink>

          <NavLink
            to="/notifications"
            className="flex gap-x-2 items-center px-3 py-2 hover:bg-lime-200 rounded-md"
          >
            <img src={notification} className="w-4 h-4" />
            <span className="text-sm font-medium text-[#1A1A1A]">
              Notification
            </span>
          </NavLink>

          <NavLink
            to="/settings"
            className="flex gap-x-2 items-center px-3 py-2 hover:bg-lime-200 rounded-md"
          >
            <img src={settings} className="w-4 h-4" />
            <span className="text-sm font-medium text-[#1A1A1A]">
              Settings
            </span>
          </NavLink>

          <NavLink
            to="/previews"
            className="flex gap-x-2 items-center px-3 py-2 hover:bg-lime-200 rounded-md"
          >
            <img src={previews} className="w-4 h-4" />
            <span className="text-sm font-medium text-[#1A1A1A]">
              My Preview
            </span>
          </NavLink>

          <button
            onClick={handleLogoutClick} // ⬅️ open confirm modal instead of direct logout
            className="flex gap-x-2 items-center px-3 py-2 cursor-pointer hover:bg-lime-200 rounded-md w-full text-left"
          >
            <img src={logoutIcon} className="w-4 h-4" />
            <span className="text-sm font-medium text-[#1A1A1A]">
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Logout confirmation modal */}
      {showConfirmLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl px-6 py-5 w-[90%] max-w-sm shadow-lg">
            <h2 className="text-base font-semibold text-gray-900">
              Log out of this account?
            </h2>
            <p className="mt-2 text-xs text-gray-600">
              You will need to log in again to access your Velora account.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelLogout}
                className="px-4 py-2 text-xs rounded-full border border-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="px-4 py-2 text-xs rounded-full bg-red-500 text-white font-semibold"
              >
                Yes, log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
