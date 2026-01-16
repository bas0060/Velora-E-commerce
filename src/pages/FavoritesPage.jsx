import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../component/ProductCard';
import JustForYou from '../component/JustForYou';
// import productData from '../data/productData'; // Importing the product data

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { cart, addToCart } = useCart(); 

  // Move products to the cart when the button is clicked
  const moveToCart = () => {
    favorites.forEach((product) => {
      // Only move the product to the cart if it isn't already there
      if (!cart.some((item) => item.id === product.id)) {
        addToCart(product);
      }
    });
  };

  return (
    <section className="bg-[#F8F8F8] md:pb-16">     
      <div className="w-[90%] flex flex-col gap-y-6 md:gap-y-10 m-auto">
        <div className="flex flex-col gap-y-3 md:gap-y-10">  
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <div className="bg-[#A1C249] w-4 h-8"></div>
              <h className="text-[1.25rem] font-medium text-[#1A1A1A]">Wishlist</h>
            </div>
            <h3 className="hidden md:block text-xl font-semibold">Click on products to view details</h3>  
            <div className="flex items-center gap-3">
              <button
                onClick={moveToCart}  // Trigger moveToCart when clicked
                className="px-4 py-2 bg-[#A1C249] rounded disabled:opacity-50"
                disabled={favorites.length === 0}  // Disable if no favorites
              >
                Move to cart
              </button>
            </div>
          </div>
          <h3 className="block md:hidden text-lg text-center font-semibold pt-2">Click on products to view details</h3>  

          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-xl mb-4">You have no favorites yet.</p>
              <Link to="/shop" className="text-white bg-[#A1C249] px-6 py-2 rounded">Browse products</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 md:gap-y-10 py-4 md:pt-10">
              {favorites.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <ProductCard product={product} showDelete />
                </Link>
              ))}
            </div>
          )}
        </div>
        <JustForYou />
      </div>
    </section>
  );
};

export default FavoritesPage;
