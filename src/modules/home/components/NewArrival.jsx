
import React from "react";
import ProductCard from "@/modules/home/components/ProductCard";
import chevLeft from "@/assets/icons/chevronLeft.svg";
import chevRight from "@/assets/icons/chevronRight.svg";
import Carousel from "@/modules/home/components/ui/Carousel";
import { useGetNewProducts } from "../api/use-get-new-arrival";

const NewArrival = () => {

  // const filters = {};
  
  const { data: newProducts } = useGetNewProducts();

  // Normalise data: support both { documents: [] } or straight []
  const items = newProducts?.documents || newProducts || [];

  if (!items || items.length === 0) return null;
  const headingLabel = "All Products";

  return (
    <section className="bg-[#F8F8F8] py-16">
      <div className="m-auto w-[90%] flex flex-col gap-y-8">
        {/* Section heading */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-3">
              <div className="bg-[#A1C249] w-4 h-8" />
              <p className="text-[1.125rem] font-medium text-[#1A1A1A]">
                {headingLabel}
              </p>
            </div>
            <h3 className="font-medium text-4xl leading-6 text-[#1A1A1A]">
              New Arrivals
            </h3>
          </div>
        </div>

        {/* Carousel handles scrolling + chevrons */}
        <Carousel
          items={items}
          chevLeft={chevLeft}
          chevRight={chevRight}
          title={null}
          renderItem={function renderItem(product) {
            return <ProductCard product={product} />;
          }}
        />
      </div>
    </section>
  );
};

export default NewArrival;