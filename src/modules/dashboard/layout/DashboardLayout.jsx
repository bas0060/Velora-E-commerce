import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/modules/home/components/Navbar"; 
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardSecondaryNav from "../components/DashboardSecondaryNav";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col  bg-[#F7F6F2] gap-4 md:gap-8">
        <div className="">
          <Navbar />
          <DashboardSecondaryNav />
        </div>

        {/* Below the navbar: sidebar + main content side by side */}
        <div className="flex flex-1 overflow-hidden">
            {/* ── Sidebar ── */}
            <DashboardSidebar />

            {/* Page content injected here by child routes */}
            <main className="flex-1">
              <div className="border border-[#F6F8FA] rounded-lg shadow-xs/10 bg-white m-4 px-4 py-6 lg:p-6 lg:mr-6">
                <Outlet />            
              </div>
            </main>
        </div>
    </div>
  );
};

export default DashboardLayout;
