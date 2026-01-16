// import React, { useRef } from "react";
// import productData from "../data/productData";
// import ProductCard from "./ProductCard";
// import chevLeft from "../assets/icons/chevronLeft.svg";
// import chevRight from "../assets/icons/chevronRight.svg";

// const ShopTopProduct = ({ category, selected, products = [] }) => {
//   if (!category) return null;
//   if (selected !== category) return null;

//   const items = products && products.length ? products : productData;
//   const topProducts = items.filter((p) => p.isTopProduct === true);
//   const displayProducts = topProducts.length ? topProducts : items;
//   if (!displayProducts || displayProducts.length === 0) return null;

//   const scrollRef = useRef(null);

//   // Pair products into columns (each column holds 2 products: top & bottom)
//   const pairs = [];
//   for (let i = 0; i < displayProducts.length; i += 2) {
//     pairs.push([displayProducts[i], displayProducts[i + 1]]);
//   }

//   // Scroll by one column (one pair) so both top/bottom move together
//   const scrollNext = () => {
//     const container = scrollRef.current;
//     if (!container || !container.firstChild) return;
//     const slideWidth = container.firstChild.offsetWidth + 24; // gap included
//     container.scrollBy({ left: slideWidth, behavior: "smooth" });
//   };

//   const scrollPrev = () => {
//     const container = scrollRef.current;
//     if (!container || !container.firstChild) return;
//     const slideWidth = container.firstChild.offsetWidth + 24;
//     container.scrollBy({ left: -slideWidth, behavior: "smooth" });
//   };

//   return (
//     <section className=" bg-[#F8F8F8] py-8">
//       <div className="w-full flex flex-col gap-y-8">
//         <div className="flex justify-between items-end ">
//           <div className="flex flex-col gap-y-4">
//             <div className="flex items-center gap-x-3">
//               <div className="bg-[#A1C249] w-4 h-8" />
//               <p className="text-[1.125rem] font-medium text-[#1A1A1A]">{category}</p>
//             </div>
//             <h3 className="font-medium text-4xl leading-6 text-[#1A1A1A]">{`Top ${category} Products`}</h3>
//           </div>

//           <div className="flex gap-3">
//             <button onClick={scrollPrev} className="px-3 h-10 md:h-full md:p-4 my-auto rounded-full bg-white shadow">
//               <img src={chevLeft} alt="left" className="w-4 aspect-square md:w-6 md:py-1" />
//             </button>
//             <button onClick={scrollNext} className="px-3 h-10 md:h-full md:p-4 my-auto rounded-full  bg-white shadow">
//               <img src={chevRight} alt="right" className="w-4 aspect-square md:w-6 md:py-1" />
//             </button>
//           </div>
//         </div>

//         <div
//           ref={scrollRef}
//           className="flex gap-12 overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x scrollbar-hide w-full"
//           style={{ padding: 0 }}
//         >
//           {pairs.map((pair, index) => (
//             <div key={index} className="snap-start min-w-[23%] flex flex-col gap-12">
//               {pair[0] && <ProductCard product={pair[0]} />}
//               {pair[1] && <ProductCard product={pair[1]} />}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ShopTopProduct;



import React, { useRef, useState, useEffect } from "react";
import productData from "../data/productData";
import ProductCard from "./ProductCard";
import chevLeft from "../assets/icons/chevronLeft.svg";
import chevRight from "../assets/icons/chevronRight.svg";

const ShopTopProduct = ({ category, selected, products = [] }) => {
  if (!category) return null;
  if (selected !== category) return null;

  const items = products && products.length ? products : productData;
  const topProducts = items.filter((p) => p.isTopProduct === true);
  const displayProducts = topProducts.length ? topProducts : items;
  if (!displayProducts || displayProducts.length === 0) return null;

  const scrollRef = useRef(null);

  // State to track window width and control carousel behavior
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect to update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine the number of products to show based on screen width
  const getDisplayedProducts = () => {
    if (windowWidth >= 1024) {
      // Desktop: More than 8 products, show 8 by default
      return displayProducts.slice(0, 8);
    } else if (windowWidth >= 768) {
      // iPad: More than 4 products, show 4 by default
      return displayProducts.slice(0, 4);
    } else {
      // Mobile: More than 2 products, show 2 by default
      return displayProducts.slice(0, 2);
    }
  };

  const displayedProducts = getDisplayedProducts();

  // Pair products into columns (each column holds 2 products: top & bottom)
  const pairs = [];
  for (let i = 0; i < displayedProducts.length; i += 2) {
    pairs.push([displayedProducts[i], displayedProducts[i + 1]]);
  }

  // Scroll by one column (one pair) so both top/bottom move together
  const scrollNext = () => {
    const container = scrollRef.current;
    const cardWidth = container.firstChild.offsetWidth + 20;
    container.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  const scrollPrev = () => {
    const container = scrollRef.current;
    const cardWidth = container.firstChild.offsetWidth + 20;
    container.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  // Calculate whether we should enable chevron functionality
  const isChevronActive = () => {
    if (windowWidth >= 1024 && displayProducts.length > 2) return true; // Desktop: More than 8 products
    if (windowWidth >= 768 && displayProducts.length > 2) return true;  // iPad: More than 4 products
    if (windowWidth < 768 && displayProducts.length > 2) return true;   // Mobile: More than 2 products
    return false;
  };

  return (
    <section className="bg-[#F8F8F8] py-8">
      <div className="w-full flex flex-col gap-y-8">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-3">
              <div className="bg-[#A1C249] w-4 h-8"></div>
              <p className="text-[1.125rem] font-medium text-[#1A1A1A]">{category}</p>
            </div>
            <h3 className="font-medium text-4xl leading-6 text-[#1A1A1A]">{`Top ${category} Products`}</h3>
          </div>

          {/* Chevron buttons should always be there, but only work when chevron functionality is enabled */}
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className={`px-3 h-10 md:h-full md:p-4 my-auto rounded-full bg-white shadow ${!isChevronActive() ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!isChevronActive()}
            >
              <img
                src={chevLeft}
                alt="left"
                className="w-4 aspect-square md:w-6 md:py-1"
              />
            </button>
            <button
              onClick={scrollNext}
              className={`px-3 h-10 md:h-full md:p-4 my-auto rounded-full bg-white shadow ${!isChevronActive() ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!isChevronActive()}
            >
              <img
                src={chevRight}
                alt="right"
                className="w-4 aspect-square md:w-6 md:py-1"
              />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-12 overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x scrollbar-hide w-full"
          style={{ padding: 0 }}
        >
          {pairs.map((pair, index) => (
            <div key={index} className="snap-start w-full md:w-[50%] lg:min-w-[23%] flex flex-col gap-12">
              {pair[0] && <ProductCard product={pair[0]} />}
              {pair[1] && <ProductCard product={pair[1]} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopTopProduct;
