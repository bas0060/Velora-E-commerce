import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import productData from "../data/productData"; // Importing the product data
import JustForYou from "../component/JustForYou";
import { BiCart } from "react-icons/bi";
// import RoadMap from "../component/RoadMap";
import { ReviewModal } from "../component/ui/ReviewModal";  // Import ReviewModal
import storeLogo from '../assets/images/storeLogo.svg'
import BackButton from "../component/ui/BackButton"
import verifiedIcon from '../assets/icons/verifiedIcon.svg'
import followingIcon from '../assets/icons/followingIcon.svg'
// import followingIcon from '../assets/images/storeLogo.svg'

const ProductDetailPage = () => {
  const { productId } = useParams(); // Get the productId from URL params
  const { addToCart } = useCart();

  const product = productData.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>; // If no product is found, show a message
  }

  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : ''); // Default to first color if available
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : ''); // Default to first size if available
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images?.[0]);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // State to control modal visibility

  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      addToCart({ ...product, selectedColor, selectedSize, quantity });
      toast.success(`${product.name} added to cart`);
    } else {
      toast.error("Please select color and size before adding to cart.");
    }
  };

  const openReviewModal = () => {
    setIsReviewModalOpen(true); // Open modal
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false); // Close modal
  };

  return (
    <section className="bg-[#F8F8F8] pt-4 pb-16">
      <div className="w-[90%] mx-auto flex flex-col gap-y-4 md:gap-y-8">
        <BackButton/>
        <div className="flex items-center gap-x-3">
          <div className="bg-[#A1C249] w-4 h-8"></div>
          <p className="text-[1rem] md:text-[1.25rem] font-medium text-[#1A1A1A]">Product Details</p>
        </div>

        <div className="flex flex-col gap-y-6 md:gap-y-9 lg:flex-row lg:items-start justify-between">
          <div className="flex flex-col md:flex-row md:h-122 lg:h-160 items-start gap-y-4 md:gap-10 w-full lg:w-[60%]">
            <div className="flex flex-row w-full h-full md:h-full md:w-auto md:flex-col gap-2">
              {product.images &&
                product?.images.map((image, index) => (
                  <div key={index} className="bg-[#DBDBDB] w-full h-full md:w-auto py-1 md:px-4 lg:py-2">
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name}-${index}`}
                      className="w-24 h-24 md:w-30 lg:w-34 lg:h-34 object-contain cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    />
                  </div>
                ))}
            </div>
            <div className="bg-[#DBDBDB] w-full md:h-full">
              <div className=" flex justify-center h-full lg:h-full">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className=" object-cover py-6 md:py-10 lg:py-12"
                />
              </div>
            </div>
          </div>

          <div className="lg:w-3/8 flex flex-col gap-y-4 md:mt-4">
              <div className="flex flex-col gap-y-4 border-b-2 pb-6 mb-3 md:border-b-3 md:pb-9 md:mb-5 border-gray-400">
                  <h2 className="text-[1.5rem] md:text-[2rem] font-medium text-gray-800 leading-[100%]">{product.name}</h2>
                  <div className="text-sm text-[#1a1a1a] flex items-center gap-x-2">
                      <p className="font-medium text-[0.75rem] text-[#1A1A1A]">{product.rating}</p>
                      <p className="text-[#A1A1A1] font-medium text-[0.75rem]">({product.reviews} reviews)</p>
                      <p className="text-[1.2rem] md:text-2xl text-gray-600">|</p>
                      {/* Stock availability: In Stock or Out of Stock */}
                      <p className="">
                      {product.inStock ? (
                          <span className="text-green-500 font-medium text-[1.2rem] md:text-2xl">In stock</span>
                      ) : (
                          <span className="text-red-500 font-medium text-[1.2rem] md:text-2xl">Out of stock</span>
                      )}
                      </p>
                  </div>
                  <p className="text-lg text-gray-800 leading-[100%]">${product.price}</p>
                  <p className="text-sm text-gray-800 ">{product.description}</p>
                  <div className="flex items-center justify-between">
                      <div className="flex gap-x-2 md:gap-x-5">
                          <img src={storeLogo} alt="storeLogo" className="md:w-16 object-contain" />
                          <div className="flex items-start gap-x-1 lg:gap-x-2">
                              <div className="flex flex-col md:gap-y-1">
                                  <h3 className="font-medium text-[1.1rem] md:text-[22px]">Velora Store</h3>
                                  <p className="font-normal text-[1rem] md:text-[18px] text-[#A1A1A1]">Official store</p>
                              </div>
                              <img src={verifiedIcon} alt="verifiedIcon" className="pt-2"/>
                          </div>
                      </div>
                      <div className="bg-black flex items-center gap-x-3 px-4.5 py-2.5 md:px-6.5 md:py-4 rounded-[40px]">
                          <img src={followingIcon} alt="followingIcon" className="bg-white p-1 rounded-full"/>
                          <p className="text-[14px] md:text-[18px] font-medium text-white">Following</p>
                      </div>
                  </div>
              </div>

              <ReviewModal open={isReviewModalOpen} onClose={closeReviewModal} productId={productId} />

              <div className="flex flex-col gap-y-6 lg:gap-y-7">
                  <div className="flex items-center gap-x-4">
                      <label className="text-sm text-gray-800">Colors:</label>
                      <div className="flex gap-2">
                          {product.colors &&
                          product.colors?.map((color, index) => (
                              <button
                              key={index}
                              onClick={() => setSelectedColor(color)}
                              className={`px-3 py-1 cursor-pointer border rounded-md hover:bg-[#83c249] ${selectedColor === color ? "bg-[#A1C249] text-white" : "bg-gray-200"}`}
                              >
                              {color}
                              </button>
                          ))}
                      </div>
                  </div>

                  <div className="flex items-center gap-x-4">
                      <label className="text-sm text-gray-800">Size:</label>
                      <div className="flex gap-2">
                          {product.sizes &&
                          product.sizes.map((size, index) => (
                              <button
                              key={index}
                              onClick={() => setSelectedSize(size)}
                              className={`px-3 py-1 border rounded-md hover:bg-[#83c249] cursor-pointer ${selectedSize === size ? "bg-[#A1C249] hover:bg-[#83c249] text-white" : "bg-gray-200"}`}
                              >
                              {size}
                              </button>
                          ))}
                      </div>
                  </div>

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
                          className=" bg-[#A1C249] hover:bg-[#83c249] flex items-center gap-x-2 text-black px-6 py-1 md:py-2 rounded-md cursor-pointer"
                      >
                          Add to Cart <BiCart />
                      </button>
                  </div>

                  <div className="flex items-center justify-between md:justify-normal md:gap-x-8">
                      <button
                          onClick={openReviewModal}
                          className="md:w-full cursor-pointer text-[#A1C249] border-2 rounded-xl py-1.5 px-3 md:px-4 md:font-semibold hover:bg-[#83c249] hover:text-gray-800 hover:border-[#83c249]"
                      >
                          Review product
                      </button>

                      <Link to="/checkout" className="md:w-full">
                          <button className="md:w-full bg-blue-500 hover:bg-blue-800 text-white px-3 md:px-8 py-2 rounded-xl">
                          Proceed to Checkout
                          </button>
                      </Link>
                  </div>
              </div>        
          </div>
        </div>
        <JustForYou />
        {/* <RoadMap /> */}
      </div>

      {/* Review Modal */}
      <ReviewModal open={isReviewModalOpen} onClose={closeReviewModal} productId={productId} />
    </section>
  );
};

export default ProductDetailPage;
