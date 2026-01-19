import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryButtons from "./CategoryButtons";
import ProductCard from "./ProductCard";
import productData from "../data/productData";
import chevLeft from '../assets/icons/chevronLeft.svg';
import chevRight from '../assets/icons/chevronRight.svg';

const categories = ["All", "Men Clothes", "Women Footwear", "Men Footwear", "Beauty"];

const Categories = () => {
  const [selected, setSelected] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(1);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const filteredProducts =
    selected === "All"
      ? productData
      : productData.filter((p) => p.category.trim() === selected);

  const needCarousel = filteredProducts.length > visibleCount;

  const scrollByOne = () => {
    const c = containerRef.current;
    if (!c) return;

    const first = c.querySelector("[data-card]");
    if (!first) return;

    const style = getComputedStyle(first);
    const marginRight = parseFloat(style.marginRight) || 0;
    const amount = Math.ceil(first.offsetWidth + marginRight);

    c.scrollBy({ left: amount, behavior: "smooth" });
  };

  const scrollBackOne = () => {
    const c = containerRef.current;
    if (!c) return;

    const first = c.querySelector("[data-card]");
    if (!first) return;

    const style = getComputedStyle(first);
    const marginRight = parseFloat(style.marginRight) || 0;
    const amount = Math.ceil(first.offsetWidth + marginRight);

    c.scrollBy({ left: -amount, behavior: "smooth" });
  };

  return (
    <div className="bg-[#F8F8F8]">
      <div className="flex flex-col gap-y-12 m-auto w-[90%] pt-10">
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center gap-x-3">
            <div className="bg-[#A1C249] w-4 h-8"></div>
            <p className="text-[1.25rem] font-medium text-[#1A1A1A]">Categories</p>
          </div>
          <h3 className="font-medium text-3xl lg:text-5xl leading-[100%] lg:leading-6 text-[#1A1A1A]">
            Shop by Category
          </h3>
        </div>

        <div className="flex flex-col gap-y-20 md:flex-row gap-x-20 justify-between">
          
          {/* ⬇️ Replaced your manual mapping with reusable component */}
          <CategoryButtons
            categories={categories}
            selected={selected}
            setSelected={setSelected}
          />

          {/* EVERYTHING BELOW THIS LINE REMAINS EXACTLY AS YOUR ORIGINAL CODE */}
          <div className="w-full md:w-[55%] lg:w-[80%] relative">
            {needCarousel && (
              <div>
                <button
                  onClick={scrollBackOne}
                  className="absolute right-18 cursor-pointer -top-8 -translate-y-1/2 z-20 bg-white text-3xl py-4 px-5 rounded-full shadow"
                  aria-label="scroll left"
                >
                  <img src={chevLeft} alt="chevLeft" />
                </button>
                <button
                  onClick={scrollByOne}
                  className="absolute cursor-pointer right-0 -top-8 -translate-y-1/2 z-20 bg-white py-4 px-5 rounded-full shadow"
                  aria-label="scroll right"
                >
                  <img src={chevRight} alt="chevRight" />
                </button>
              </div>
            )}

            {!needCarousel ? (
              <div className="grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-3">
                {filteredProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div
                ref={containerRef}
                className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth py-3"
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    data-card
                    className="snap-start shrink-0"
                    style={{
                      width: `calc((100% - ${(visibleCount - 1) * 1.5}rem) / ${visibleCount})`,
                      marginRight: "1.5rem",
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
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

export default Categories;
