import React, { useRef } from "react";
import productData from "../data/productData";
import ProductCard from "../component/ProductCard";
import chevLeft from "../assets/icons/chevronLeft.svg";
import chevRight from "../assets/icons/chevronRight.svg";

const NewArrival = () => {
  const scrollRef = useRef(null);

  const pairs = [];
  for (let i = 0; i < productData.length; i += 2) {
    pairs.push([productData[i], productData[i + 1]]);
  }

  const scrollNext = () => {
    const container = scrollRef.current;
    const slideWidth = container.firstChild.offsetWidth + 24; // gap
    container.scrollBy({ left: slideWidth, behavior: "smooth" });
  };

  const scrollPrev = () => {
    const container = scrollRef.current;
    const slideWidth = container.firstChild.offsetWidth + 24;
    container.scrollBy({ left: -slideWidth, behavior: "smooth" });
  };

  return (
    <div className="bg-[#F8F8F8] py-18">
      <div className="w-[90%] mx-auto flex flex-col gap-y-10">
        <div className="flex justify-between">
            <div className="flex flex-col gap-y-6">
              <div className="flex items-center gap-x-3">
                <div className="bg-[#A1C249] w-4 h-8"></div>
                <p className="text-[1.25rem] font-medium text-[#1A1A1A]">This month</p>
              </div>
              <h3 className="font-medium text-5xl leading-6 text-[#1A1A1A]">New Arrivals</h3>
            </div>

            <div className="flex self-end gap-3">
              <button
                onClick={scrollPrev}
                className="py-4 px-5 rounded-full shadow bg-white"
              >
                <img src={chevLeft} alt="left" />
              </button>

              <button
                onClick={scrollNext}
                className="py-4 px-5 rounded-full shadow bg-white"
              >
                <img src={chevRight} alt="right" />
              </button>
            </div>
        </div>

        <div
          ref={scrollRef}
          className="
            flex gap-12 overflow-x-auto scroll-smooth
            snap-x snap-mandatory
            touch-pan-x
            scrollbar-hide
          "
        >
          {pairs.map((pair, index) => (
            <div
              key={index}
              className="
                snap-start
                min-w-[23%]
                flex flex-col gap-12
              "
            >

              {pair[0] && <ProductCard product={pair[0]} />}

              {pair[1] && <ProductCard product={pair[1]} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/products")}
            className="bg-[#A1C249] px-18 py-3 rounded-[1.875rem] text-white font-bold leading-7"
          >
            View all Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
