import React from "react";

const CategoryButtons = ({ categories = [], selected, setSelected }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full lg:flex-col gap-2 lg:w-55">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`w-full text-left md:text-center lg:text-left py-1 md:py-3 font-medium cursor-pointer 
            ${selected === cat ? "text-[#A1C249]" : "text-[#A1A1A1]"}
          `}
          onClick={() => setSelected(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
