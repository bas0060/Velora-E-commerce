import React from "react";

const CategoryCard = ({ name, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left py-3 rounded-md font-medium cursor-pointer 
        ${active ? " text-[#A1C249]" : " text-[#A1A1A1]"}
      `}
    >
      {name}
    </button>
  );
};

export default CategoryCard;
