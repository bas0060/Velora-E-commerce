import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import { useGetProductDetail } from "../api/use-get-product-detail";
import JustForYou from "@/modules/home/components/JustForYou";
import { BiCart } from "react-icons/bi";
import { ReviewModal } from "@/modules/home/components/modals/ReviewModal";
import storeLogo from "@/assets/images/storeLogo.svg";
import BackButton from "@/modules/home/components/ui/BackButton";
import verifiedIcon from "@/assets/icons/verifiedIcon.svg";
import followingIcon from "@/assets/icons/followingIcon.svg";
import ProductDetailSkeleton from "../components/loaders/ProductDetailSkeleton";

function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { data: product, isLoading, error } = useGetProductDetail(productId);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors ? product.colors[0] : "");
      setSelectedSize(product.sizes ? product.sizes[0] : "");
      setSelectedImage(product.images?.[0]);
    }
  }, [product]);

  if (isLoading) return <ProductDetailSkeleton />;
  if (error || !product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      addToCart({ ...product, selectedColor, selectedSize, quantity });
      toast.success(`${product.name} added to cart`);
    } else {
      toast.error("Please select color and size before adding to cart.");
    }
  };


  const handleProceedToCheckout = () => {
    // console.log("product._id:", product._id);
    navigate("/checkout", {
      state: {
        items: [
          {
            id: product._id,            
            quantity,                    
            name: product.name,          
            image: product.images?.[0],  
            price: product.price,        
          },
        ],
        orderSummary: {
          subtotal: product.price * quantity,
          shipping: 0,                   
          total: product.price * quantity,
        },
      },
    });
  };

  return (
    <section className="bg-[#F8F8F8] pt-4 pb-16">
      <div className="w-[90%] mx-auto flex flex-col gap-y-4 md:gap-y-8">
        <BackButton />
        <div className="flex items-center gap-x-3">
          <div className="bg-[#A1C249] w-4 h-8"></div>
          <p className="text-[1rem] md:text-[1.25rem] font-medium text-[#1A1A1A]">
            Product Details
          </p>
        </div>

        <div className="flex flex-col gap-y-10 md:gap-y-10 lg:flex-row lg:items-start justify-between">
          <div className="flex flex-col md:flex-row md:h-124 lg:h-142 items-start gap-y-6 md:gap-7 w-full lg:w-[60%]">
            {/* Thumbnail column */}
            <div className="flex flex-row md:flex-col md:h-full md:w-auto gap-2">
              {product.images &&
                product.images.map((image, index) => (
                  <div
                    key={index}
                    className="bg-[#DBDBDB] flex-1 flex items-center justify-center px-2 md:px-4 py-1 md:py-0 cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${product.name}-${index}`}
                      className="w-24 md:w-30 lg:w-34 h-24 md:h-full object-contain"
                    />
                  </div>
                ))}
            </div>

            {/* Main image */}
            <div className="bg-[#DBDBDB] w-full md:h-full">
              <div className="flex justify-center items-center h-full">
                <img
                  src={selectedImage || null}
                  alt={product.name}
                  className="object-contain max-h-100 md:max-h-full py-6 px-4 md:py-10 lg:py-12"
                />
              </div>
            </div>
          </div>

          <div className="lg:w-3/8 flex flex-col gap-y-4 md:mt-4">
            <div className="flex flex-col gap-y-4 border-b-2 pb-6 mb-3 md:border-b-3 md:pb-9 md:mb-5 border-gray-400">
              <h2 className="text-[1.5rem] md:text-[2rem] font-medium text-gray-800 leading-[100%]">
                {product.name}
              </h2>
              <div className="text-sm text-[#1a1a1a] flex items-center gap-x-2">
                <p className="text-[#A1A1A1] font-medium text-[0.75rem]">
                  <span className="font-medium text-[0.75rem] text-[#1A1A1A]">
                    {product.rating}
                  </span>{" "}
                  (reviews)
                </p>
                <p className="text-[1.2rem] md:text-2xl text-gray-600">|</p>
                <p>
                  {product.inStock ? (
                    <span className="text-green-500 font-medium text-[1.2rem] md:text-2xl">
                      In stock
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium text-[1.2rem] md:text-2xl">
                      Out of stock
                    </span>
                  )}
                </p>
              </div>
              <p className="text-lg text-gray-800 leading-[100%]">
                #{product.price}
              </p>
              <p className="text-sm text-gray-800">{product.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-x-2 md:gap-x-5">
                  <img
                    src={storeLogo}
                    alt="storeLogo"
                    className="md:w-16 object-contain"
                  />
                  <div className="flex items-start gap-x-1 lg:gap-x-2">
                    <div className="flex flex-col md:gap-y-1">
                      <h3 className="font-medium text-[1.1rem] md:text-[22px]">
                        Velora Store
                      </h3>
                      <p className="font-normal text-[1rem] md:text-[18px] text-[#A1A1A1]">
                        Official store
                      </p>
                    </div>
                    <img src={verifiedIcon} alt="verifiedIcon" className="pt-2" />
                  </div>
                </div>
                <div className="bg-black flex items-center gap-x-3 px-4.5 py-2.5 md:px-6.5 md:py-4 rounded-[40px]">
                  <img
                    src={followingIcon}
                    alt="followingIcon"
                    className="bg-white p-1 rounded-full"
                  />
                  <p className="text-[14px] md:text-[18px] font-medium text-white">
                    Following
                  </p>
                </div>
              </div>
            </div>

            <ReviewModal
              open={isReviewModalOpen}
              onClose={() => setIsReviewModalOpen(false)}
              productId={productId}
            />

            <div className="flex flex-col gap-y-6 lg:gap-y-7">
              {/* Colors */}
              <div className="flex items-center gap-x-4">
                <label className="text-sm text-gray-800">Colors:</label>
                <div className="flex gap-2">
                  {product.colors &&
                    product.colors?.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1 cursor-pointer border rounded-md hover:bg-[#83c249] ${
                          selectedColor === color
                            ? "bg-[#A1C249] text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="flex items-center gap-x-4">
                <label className="text-sm text-gray-800">Size:</label>
                <div className="flex gap-2">
                  {product.sizes &&
                    product.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 border rounded-md hover:bg-[#83c249] cursor-pointer ${
                          selectedSize === size
                            ? "bg-[#A1C249] hover:bg-[#83c249] text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                </div>
              </div>

              {/* Quantity + Add to cart */}
              <div className="flex items-center gap-x-4">
                <div className="flex items-center py-1 rounded-lg bg-gray-300 lg:w-[20.2%] px-1">
                  <button
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                    className="md:py-1 bg-white rounded-md w-7 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="md:py-1 bg-white rounded-md w-7 cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-[#A1C249] hover:bg-[#83c249] flex items-center gap-x-2 text-black px-6 py-1 md:py-2 rounded-md cursor-pointer"
                >
                  Add to Cart <BiCart />
                </button>
              </div>

              {/* Review + Checkout */}
              <div className="flex items-center justify-between md:justify-normal md:gap-x-8">
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="md:w-full cursor-pointer text-[#A1C249] border-2 rounded-xl py-1.5 px-3 md:px-4 md:font-semibold hover:bg-[#83c249] hover:text-gray-800 hover:border-[#83c249]"
                >
                  Review product
                </button>

                {/* ── Was <Link to="/checkout"> — now uses navigate() with state ── */}
                <button
                  onClick={handleProceedToCheckout}
                  className="md:w-full bg-blue-500 hover:bg-blue-800 text-white px-3 md:px-8 py-2 rounded-xl"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>

        <JustForYou />
      </div>
    </section>
  );
}

export default ProductDetailPage;
