
import React from "react";
import ProductCard from "./ProductCard";
import chevLeft from "@/assets/icons/chevronLeft.svg";
import chevRight from "@/assets/icons/chevronRight.svg";
import Carousel from "./ui/Carousel"; // adjust path if needed
import { useGetTopProducts } from "../api/use-get-top-products";

const ShopTopProduct = ({ categoryId, categoryName }) => {
  // Build filters for the API
  const filters = {};
  if (categoryId) {
    filters.category = categoryId;
  }

  const { data } = useGetTopProducts(filters);

  // Normalise shape: either data.documents or flat array
  const items = data?.documents || data || [];

  if (!items || items.length === 0) return null;

  const headingLabel = categoryName || "All Products";

  return (
    <section className="bg-[#F8F8F8] py-8">
      <div className="w-full flex flex-col gap-y-8">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-3">
              <div className="bg-[#A1C249] w-4 h-8" />
              <p className="text-[1.125rem] font-medium text-[#1A1A1A]">
                {headingLabel}
              </p>
            </div>
            <h3 className="font-medium text-4xl leading-6 text-[#1A1A1A]">
              {`Top ${headingLabel} Products`}
            </h3>
          </div>
        </div>

        <Carousel
          items={items}
          chevLeft={chevLeft}
          chevRight={chevRight}
          title={null}
          renderItem={(product) => <ProductCard product={product} />}
        />
      </div>
    </section>
  );
};

export default ShopTopProduct;
