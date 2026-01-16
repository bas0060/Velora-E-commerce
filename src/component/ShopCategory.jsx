import React from "react";
import ShopCategoryButtons from "./ShopCategoryButtons";
import ShopTopProduct from "./ShopTopProduct";
import productData from "../data/productData";
import { Link } from "react-router-dom";
import arrowUp from '../assets/icons/arrow.svg'
import shopCat from '../assets/images/shopCat.svg'

const categories = ["All", "Men Clothes", "Women Footwear", "Men Footwear", "Beauty"];

const ShopCategory = ({ selected, setSelected }) => {
  // If parent didn't pass selected, fall back to 'All'
  const current = selected || "All";

  // Filter products based on selected category
  const filteredProducts =
    current === "All"
      ? productData
      : productData.filter((p) => p.category.trim() === current);

  const handleCategorySelect = (category) => {
    if (setSelected) setSelected(category);
  };

  return (
    <div className="bg-[#F8F8F8] py-10">
      <div className="w-[90%] m-auto flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-4 lg:flex-row items-start gap-x-20 justify-between">
          <div className="flex flex-col gap-y-4 md:gap-y-8 md:w-full lg:w-auto">
            <div className="flex flex-col gap-y-5">
              <div className="flex items-center gap-x-3">
                <div className="bg-[#A1C249] w-4 h-8"></div>
                <p className="text-[1.25rem] font-medium text-[#1A1A1A]">Categories</p>
              </div>
              <h2 className="font-medium text-2xl md:text-5xl leading-6 text-[#1A1A1A]">
                Shop by Category
              </h2>
            </div>
            {/* Category Buttons */}
            <ShopCategoryButtons
              categories={categories}
              selected={current}
              setSelected={handleCategorySelect}
            />
          </div>
          <div className="flex flex-col gap-y-6 md:flex-row items-start w-full lg:w-[63%] bg-[#A1C249] py-3 px-3 md:px-8 lg:pt-5 md:pb-10 rounded-xl lg:rounded-3xl">
            <div className="flex flex-col md:gap-y-8 w-full md:pt-16">
              <div className="flex flex-col gap-y-4 md:gap-y-2">
                <p className="text-[1.25rem] md:text-[1.45rem]  font-medium text-[#1A1A1A] md:leading-10">Limited Offer</p>
                <h3 className="text-[2.125rem] md:text-[2.5rem] lg:text-[3.125rem] lg:w-6/7 md:w-full font-medium text-black leading-[100%] md:leading-16">
                  Up to 10% off Voucher
                </h3>
              </div>
              <Link to={'/favorites'} className="hidden md:block bg-black w-[60%] md:w-[80%] lg:w-[60%]  rounded-[3rem]">
                <div className="flex items-center justify-center gap-x-2 md:gap-x-4 py-2 md:py-4">
                  <p className="text-[1.2rem] md:text-[1.4rem] font-medium text-white md:leading-10">Shop now</p>
                  <div className=" bg-white rounded-full">
                    <img src={arrowUp} alt="arrowUp" className="w-7 h-7 md:w-9 md:h-auto p-2 " />
                  </div>
                </div>
              </Link>
            </div>
            <img src={shopCat} alt="shopCategory-woman" className="hidden md:block w-full h-full object-cover" />
            <div className="flex md:hidden items-center flex-col gap-y-8">
              <img src={shopCat} alt="shopCategory-woman" className="w-full h-full object-cover" />
              <Link to={'/favorites'} className="block md:hidden bg-black w-[60%] md:w-[60%] rounded-[3rem]">
                <div className="flex items-center justify-center gap-x-2 md:gap-x-4 py-2 md:py-4">
                  <p className="text-[1.2rem] md:text-[1.4rem] font-medium text-white md:leading-10">Shop now</p>
                  <div className=" bg-white rounded-full">
                    <img src={arrowUp} alt="arrowUp" className="w-7 h-7 md:w-9 md:h-9 p-2 " />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* Dynamically render ShopTopProduct for each category */}
        {categories.map((category) => (
          <ShopTopProduct
            key={category}
            category={category}
            selected={current}
            products={filteredProducts.filter(
              (product) => product.category === category || current === "All"
            )} 
          />
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
