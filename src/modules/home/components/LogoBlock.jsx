import { React } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.svg";

export const LogoBlock = () => (
  <Link to="/">
    <div className="flex items-center gap-x-2">
      <div className="bg-[#A1C249] p-[.17rem] md:p-[.27rem] rounded-[.57rem]">
        <img src={logo} alt="logo" className="w-10 md:w-auto aspect-square" />
      </div>
      <div className="flex flex-col gap-y-1">
        <h2 className="leading-[100%] font-semibold md:font-bold text-[1.25rem] md:text-[2.25rem]">Velora.</h2>
        <p className="leading-[100%] font-normal text-[.5rem]">
          Think forward, Spend Smarter
        </p>
      </div>
    </div>
  </Link>
);