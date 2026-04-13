import React from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useFavorites } from "../../../context/FavoritesContext";
import { useCart } from "../../../context/CartContext";
import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, showDelete = false }) => {
  const { toggleFavorite, isFavorited } = useFavorites();
  const { addToCart, cart } = useCart();

  // Normalize id — API products use _id (MongoDB), local/dummy data may use id
  const productId = product._id || product.id;

  // Derive directly from context state — no useState/useEffect needed
  const isInCart = cart.some((item) => item.id === productId);
  const favorited = isFavorited(productId);

  const handleFavoriteAction = () => {
    toggleFavorite(product);
  };

  const handleCartAction = () => {
    addToCart(product);
  };

  return (
    <Link to={`/product/${product._id}`} className="w-full flex flex-col gap-y-2 rounded-[1.875rem] shadow p-4 bg-white">
      <div className="relative bg-[#DBDBDB] rounded-4xl flex items-center justify-center">
        <span className="absolute top-5 left-0 bg-[#A1C249] text-black font-medium text-sm px-4 py-1 rounded">
          10%
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
          alt={product?.name}
          className="pl-8 w-48 h-60 aspect-square object-contain p-6"
        />

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleCartAction();
          }}
          className="absolute w-full bottom-0"
        >
          {isInCart ? (
            <span className="w-full block absolute bottom-0 py-2 rounded-b-[1.875rem] font-medium bg-[#a2c249bb]">
              Remove from cart
            </span>
          ) : (
            <span className="w-full block cursor-pointer rounded-b-[1.875rem] absolute bottom-0 py-2 text-white font-medium bg-[#A1C249]">
              Add to Cart
            </span>
          )}
        </button>
      </div>

      <h3 className="text-[1.125rem] font-medium text-[#1A1A1A]">{product?.name}</h3>

      <div className="text-sm text-[#1a1a1a] flex items-center gap-x-2">
        <StarIcon className="text-yellow-500 size-5" />
        <p className="font-medium text-[0.75rem] text-[#1A1A1A]">{product.rating}</p>
        <p className="text-[#A1A1A1] font-medium text-[0.75rem]">({product.numReviews} reviews)</p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-[1.125rem] font-medium text-[#1A1A1A]">₦{product.price}</p>
        <p className="text-[#A1A1A1] line-through text-sm">₦30000</p>
      </div>
    </Link>
  );
};

export default ProductCard;
