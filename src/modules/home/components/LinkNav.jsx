import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", to: "/" },
  { name: "Shop", to: "/shop" },
  { name: "Blog", to: "/blogs" },
  { name: "Contact", to: "/contact" },
];

const LinkNav = () => {
    
  return (
    <div className="flex items-center gap-11">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className={({ isActive }) =>
            `
              relative pb-2 transition-all duration-300
              ${isActive ? "text-[#A1C249] font-semibold" : "text-black"}
            `
          }
        >
          {({ isActive }) => (
            <>
              {item.name}

              <span
                className={`
                  absolute left-1/2 -translate-x-1/2 bottom-0
                  h-2 w-0 rounded-full bg-[#A1C249]
                  transition-all duration-300
                  ${isActive ? "w-9" : "w-0"}
                `}
              />
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default LinkNav;
