import React, { useState, useEffect } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext"; // Import useCart hook

const ProductCard = ({ product, showDelete = false }) => {
  const { toggleFavorite, isFavorited } = useFavorites();
  const { addToCart, cart } = useCart(); 
  const [isInCart, setIsInCart] = useState(false);

  // Check if product is already in cart from global cart state (from CartContext)
  useEffect(() => {
    const exists = cart.some((item) => item.id === product.id);
    setIsInCart(exists);
  }, [cart, product.id]);

  const handleFavoriteAction = () => {
    toggleFavorite(product);
  };

  const handleCartAction = () => {
    addToCart(product); // Add or remove product from cart globally
  };

  const favorited = isFavorited(product.id);

  return (
    <div className="flex flex-col gap-y-2 rounded-[1.875rem] shadow p-4 bg-white">
      <div className="relative bg-[#DBDBDB] rounded-4xl flex items-center justify-center">
        <span className="absolute top-5 left-0 bg-[#A1C249] text-black font-medium text-sm px-4 py-1 rounded">
          {product.discount}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();  
            e.preventDefault();  
            handleFavoriteAction(); 
          }}
          aria-label={showDelete ? "remove favorite" : "toggle favorite"}
          className="absolute top-5 right-3 bg-white p-2 rounded-full shadow cursor-pointer"
        >
          {showDelete ? (
            <FaTrash className="text-red-500" />
          ) : (
            <FaHeart className={`${favorited ? "text-[#A1C249]" : "text-gray-400"}`} />
          )}
        </button>


        <img
          src={product?.images?.[0]}
          alt={product.name}
          className="pl-8 w-48 h-60 aspect-square object-contain p-6"
        />

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();  // Prevent the click event from propagating
            e.preventDefault();  // Prevent the default action (e.g., navigating to ProductDetailPage)
            handleCartAction(); // Execute the existing favorite action (e.g., deleting from favorites)
          }} 
          className="absolute w-full bottom-0"
        >
          {isInCart ? <span className="w-full block absolute bottom-0 py-2 rounded-b-[1.875rem] font-medium bg-[#a2c249bb]">Remove from cart</span> : <span className="w-full block cursor-pointer rounded-b-[1.875rem] absolute bottom-0 py-2 text-white font-medium bg-[#A1C249]">Add to Cart</span>} {/* Toggle button text */}
        </button>
      </div>

      <h3 className="text-[1.125rem] font-medium text-[#1A1A1A] ">{product.name}</h3>

      <div className="text-sm text-[#1a1a1a] flex items-center gap-x-2">
        <img src={product.img1} alt="star" className="w-4 h-4" />
        <p className="font-medium text-[0.75rem] text-[#1A1A1A]">{product.rating}</p>
        <p className="text-[#A1A1A1] font-medium text-[0.75rem]">({product.reviews} reviews)</p>
      </div>

      <div className=" flex items-center gap-2">
        <p className="text-[1.125rem] font-medium text-[#1A1A1A]">₦{product.price}</p>
        <p className="text-[#A1A1A1] line-through text-sm">₦{product.oldPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;
