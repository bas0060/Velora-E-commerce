import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import productData from '../data/productData';
import ProductCard from './ProductCard';
import chevLeft from '../assets/icons/chevronLeft.svg';
import chevRight from '../assets/icons/chevronRight.svg';

const JustForYou = ({ products: propProducts, defaultCategory = null }) => {
  const products = propProducts || productData;

  const justForYou = useMemo(() => products.filter((p) => p.isJustForYou), [products]);

  const categories = useMemo(() => {
    const s = new Set();
    justForYou.forEach((p) => {
      const cat = (p.category || 'Uncategorized').trim();
      if (cat) s.add(cat);
    });
    return Array.from(s);
  }, [justForYou]);

  const [catIndex, setCatIndex] = useState(() => {
    if (defaultCategory) return Math.max(0, categories.indexOf(defaultCategory));
    return 0;
  });

  const currentCategory = categories[catIndex] || null;

  const filtered = useMemo(() => {
    if (!currentCategory) return justForYou;
    return justForYou.filter((p) => (p.category || '').trim() === currentCategory);
  }, [justForYou, currentCategory]);

  // Chevron navigation logic - moves one category
  const nextCategory = () => {
    setCatIndex((s) => (s + 1) % categories.length);
  };

  const prevCategory = () => {
    setCatIndex((s) => (s - 1 + categories.length) % categories.length);
  };

  // Disable buttons if no more categories
  const isDisabled = categories.length <= 1;

  if (justForYou.length === 0) {
    return (
      <section className="py-12">
        <div className="flex flex-col items-center gap-y-4">
          <h3 className="text-2xl font-semibold">Just For you</h3>
          <p className="text-gray-600">No personalized items yet. Browse our catalog to get recommendations.</p>
          <Link to="/shop" className="px-6 py-2 bg-[#A1C249] text-white rounded">Browse products</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-7 md:py-12">
      <div className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center gap-x-3">
            <div className="bg-[#A1C249] w-4 h-8" />
            <p className="text-[1.25rem] font-medium text-[#1A1A1A]">{currentCategory || 'All'}</p>
          </div>
          <h3 id="category-name" className="font-medium text-5xl leading-6 text-[#1A1A1A]">Just For you</h3>
        </div>

        {/* Wrap the entire carousel section */}
        <div
          className="flex items-center gap-x-4 justify-end-safe"
        >
          <button
            onClick={prevCategory}
            aria-label="previous category"
            className={`py-4 px-5 rounded-full shadow bg-white cursor-pointer ${isDisabled ? 'opacity-50' : ''}`}
            disabled={isDisabled}
          >
            <img src={chevLeft} alt="prev" />
          </button>

          <button
            onClick={nextCategory}
            aria-label="next category"
            className={`py-4 px-5 rounded-full bg-white shadow cursor-pointer ${isDisabled ? 'opacity-50' : ''}`}
            disabled={isDisabled}
          >
            <img src={chevRight} alt="next" />
          </button>
        </div>  

        {/* Product display section */}
        <div className="overflow-hidden w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 md:gap-x-8 gap-y-8 md:gap-y-10">
            {filtered.map((product, idx) => (
              <div key={idx} className="shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JustForYou;
