import React, { useRef } from "react";
import productData from "../data/productData";
import ProductCard from "../component/ProductCard";
import chevLeft from "../assets/icons/chevronLeft.svg";
import chevRight from "../assets/icons/chevronRight.svg";

const ShopNewArrival = ({ category, selected, products = [] }) => { 
  // Render even when no category/selected props are passed (page-level usage)

  const items = products && products.length ? products : productData;
  const displayProducts = items.filter((p) => p.isNewArrival === true);
  if (!displayProducts || displayProducts.length === 0) return null;
  const scrollRef = useRef(null);

  // Pair products into columns (each column holds 2 products: top & bottom)
  const pairs = [];
  for (let i = 0; i < displayProducts.length; i += 2) {
    pairs.push([displayProducts[i], displayProducts[i + 1]]);
  }

  // Scroll by one column (one pair) so both top/bottom move together
  const scrollNext = () => {
    const container = scrollRef.current;
    if (!container || !container.firstChild) return;
    const slideWidth = container.firstChild.offsetWidth + 24; // gap included
    container.scrollBy({ left: slideWidth, behavior: "smooth" });
  };

  const scrollPrev = () => {
    const container = scrollRef.current;
    if (!container || !container.firstChild) return;
    const slideWidth = container.firstChild.offsetWidth + 24;
    container.scrollBy({ left: -slideWidth, behavior: "smooth" });
  };
  return (
    <section className=" bg-[#F8F8F8] py-16">
      <div className="w-[90%] m-auto flex flex-col gap-y-8">
        <div className="flex justify-between items-end ">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-3">
              <div className="bg-[#A1C249] w-4 h-8" />
              <p className="text-[1.125rem] font-medium text-[#1A1A1A]">{category || selected || 'All'}</p>
            </div>
            <h3 className="font-medium text-4xl leading-6 text-[#1A1A1A]">New Arrivals</h3>
          </div>

          <div className="flex gap-3">
            <button onClick={scrollPrev} className="py-4 px-5 rounded-full shadow bg-white">
              <img src={chevLeft} alt="left" />
            </button>
            <button onClick={scrollNext} className="py-4 px-5 rounded-full shadow bg-white">
              <img src={chevRight} alt="right" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-12 overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x scrollbar-hide w-full"
          style={{ padding: 0 }}
        >
          {pairs.map((pair, index) => (
            <div key={index} className="snap-start min-w-[23%] flex flex-col gap-12">
              {pair[0] && <ProductCard product={pair[0]} />}
              {pair[1] && <ProductCard product={pair[1]} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopNewArrival
