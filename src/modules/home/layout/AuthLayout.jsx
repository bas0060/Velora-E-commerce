import React from "react";
import { Outlet } from "react-router-dom";
import authImage from "@/assets/images/green_auth_background_100vh.svg";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:flex items-center justify-center lg:overflow-y-auto">
        <img
          src={authImage}
          alt="Auth background"
          className="w-full h-[739px]"
        />
      </div>

      <div className="relative flex items-center justify-center bg-white min-h-screen overflow-y-auto">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 lg:opacity-0"
          style={{ backgroundImage: `url(${authImage})` }}
        />
        <div className="absolute inset-0 bg-black/20 lg:hidden" />
        <div className="relative z-10 w-full max-w-md px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
