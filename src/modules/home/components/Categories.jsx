import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryButtons from "./CategoryButtons";
import ProductCard from "@/modules/home/components/ProductCard";
import chevLeft from "@/assets/icons/chevronLeft.svg";
import chevRight from "@/assets/icons/chevronRight.svg";
import { useGetCategories } from "../api/use-get-categories";
import { useGetProducts } from "../api/use-get-products";
import { useLazySectionLoad } from "@/lib/useLazySectionLoad";
import { SkeletonLoader } from "@/components/Loading";

const Categories = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [sectionRef, shouldLoad] = useLazySectionLoad({ rootMargin: '300px', threshold: 0.15 });

  const filters = useMemo(
    () => ({ category: selectedCategoryId }),
    [selectedCategoryId]
  );

  const { data: categories } = useGetCategories({ enabled: shouldLoad });
  const { data: products } = useGetProducts(filters, { enabled: shouldLoad });

  // Normalise products into a simple array
  const items = products?.documents || [];

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

  // Use the normalised array length for carousel decision
  const needCarousel = items.length > visibleCount;

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
      <div className="flex flex-col gap-y-8 md:gap-y-10 lg:gap-y-12 m-auto w-[90%] pt-10">
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center gap-x-3">
            <div className="bg-[#A1C249] w-4 h-8"></div>
            <p className="text-[1.25rem] font-medium text-[#1A1A1A]">
              Categories
            </p>
          </div>
          <h3 className="font-medium text-3xl lg:text-5xl leading-[100%] lg:leading-6 text-[#1A1A1A]">
            Shop by Category
          </h3>
        </div>

        <div className="flex flex-col mt-10 gap-y-10 md:flex-row justify-between">
          <div className="w-full lg:w-[25%] ">
            <CategoryButtons
              categories={categories?.documents || []}
              selected={selectedCategoryId}
              setSelected={setSelectedCategoryId}
            />
          </div>

          <div ref={sectionRef} className="w-full md:w-[55%] lg:w-[75%] relative">
            {needCarousel && (
              <div className="flex">
                <button
                  onClick={scrollBackOne}
                  className="absolute cursor-pointer -top-8 right-16 -translate-y-1/2 z-20 bg-white text-3xl py-4 px-5 rounded-full shadow"
                  aria-label="scroll left"
                >
                  <img src={chevLeft} alt="Previous products" />
                </button>
                <button
                  onClick={scrollByOne}
                  className="absolute cursor-pointer right-0 -top-8 -translate-y-1/2 z-20 bg-white py-4 px-5 rounded-full shadow"
                  aria-label="scroll right"
                >
                  <img src={chevRight} alt="Next products" />
                </button>
              </div>
            )}

            {!shouldLoad ? (
              <div className="py-10">
                <SkeletonLoader lines={5} className="w-full" />
              </div>
            ) : !needCarousel ? (
              <div className="flex gap-x-10 w-full">
                {items.map((product) => (
                  <div
                    key={product?._id}
                    className="w-full lg:w-[35%]"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div
                ref={containerRef}
                className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth py-3"
              >
                {items.map((product) => (
                  <div
                    key={product?._id}
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
            onClick={() => navigate("/shop")}
            className="bg-[#A1C249] px-18 py-3 rounded-[1.875rem] cursor-pointer text-white font-bold leading-7"
          >
            View all Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;





