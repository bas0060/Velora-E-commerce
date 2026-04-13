import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import profilePic from "@/assets/images/jacketMan.svg";
import myprofile from "@/assets/icons/myProfile.svg";
import previews from "@/assets/icons/previews.svg";
import notification from "@/assets/icons/notification.svg";
import settings from "@/assets/icons/settings.svg";
import logoutIcon from "@/assets/icons/logOut.svg";
import chevronUp from "@/assets/icons/chevronUp.svg";
import { useGetUserProfile } from "@/api/use-get-user-data";
import { useLogout } from "@/features/auth/api/use-logout";
import ConfirmLogoutModal from "./modals/ConfirmLogoutModal";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const dropdownRef = useRef(null);

  const { data: user } = useGetUserProfile();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

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
    logout();
  };

  const cancelLogout = () => {
    setShowConfirmLogout(false);
  };

  const displayName = user?.username;
  console.log(user)

  return (
    <>
      <div className="relative z-50" ref={dropdownRef}>
        <div
          className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer select-none"
          onClick={() => setOpen(!open)}
        >
          <img
            src={user?.avatar || profilePic}
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
          <span className="text-gray-600 transition-all duration-200">
            <img src={chevronUp} alt="chevron" />
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
            <span className="text-sm font-medium text-[#1A1A1A]">My Profile</span>
          </NavLink>

          <NavLink
            to="/notifications"
            className="flex gap-x-2 items-center px-3 py-2 hover:bg-lime-200 rounded-md"
          >
            <img src={notification} className="w-4 h-4" />
            <span className="text-sm font-medium text-[#1A1A1A]">Notification</span>
          </NavLink>

          <NavLink
            to="/settings"
            className="flex gap-x-2 items-center px-3 py-2 hover:bg-lime-200 rounded-md"
          >
            <img src={settings} className="w-4 h-4" />
            <span className="text-sm font-medium text-[#1A1A1A]">Settings</span>
          </NavLink>

          <NavLink
            to="/dashboard"
            className="flex gap-x-2 items-center px-3 py-2 hover:bg-lime-200 rounded-md"
          >
            <img src={previews} className="w-4 h-4" />
            <span className="text-sm font-medium text-[#1A1A1A]">Dashboard</span>
          </NavLink>

          <button
            onClick={handleLogoutClick}
            className="flex gap-x-2 items-center px-3 py-2 cursor-pointer hover:bg-lime-200 rounded-md w-full text-left"
          >
            <img src={logoutIcon} className="w-4 h-4" />
            <span className="text-sm font-medium text-[#1A1A1A]">Logout</span>
          </button>
        </div>
      </div>

      {/* Logout confirmation modal — rendered outside the dropdown div */}
      {showConfirmLogout && (
        <ConfirmLogoutModal
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
          isLoading={isLoggingOut}
        />
      )}
    </>
  );
};

export default ProfileDropdown;
