import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import JustForYou from "../component/JustForYou";

const CartsPage = () => {
  const { cart, removeFromCart, updateCartQuantity } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  // Calculate the subtotal of all products in the cart
  const calculateSubtotal = () => {
    return cart.reduce((acc, product) => acc + (product.price * (product.quantity || 1)), 0); // Ensure quantity is defined
  };

  // Calculate the total (subtotal + shipping - discount)
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + shippingCost - discount;
  };

  // Handle applying coupon
  const handleApplyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscount(calculateSubtotal() * 0.1); 
      toast.success("10% discount applied");
    } else if (couponCode === "DISCOUNT20") {
      setDiscount(calculateSubtotal() * 0.2); 
      toast.success("20% discount applied");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code");
    }
  };

  // Handle removing an item from the cart
  const handleRemoveProduct = (productId) => {
    removeFromCart(productId);
  };

  // Handle quantity changes (plus or minus buttons)
  const handleQuantityChange = (productId, action) => {
    updateCartQuantity(productId, action);
  };

  // Handle dynamic shipping cost
  const handleShippingCost = () => {
    const subtotal = calculateSubtotal();
    if (subtotal > 100) {
      setShippingCost(0); // Free shipping for orders over $100
    } else {
      setShippingCost(10); // $10 shipping for orders below $100
    }
  };

  // Run shipping cost calculation when cart is updated
  useEffect(() => {
    handleShippingCost();
  }, [cart]);

  return (
    <section className="bg-[#F8F8F8] pb-16">
      <div className="w-[90%] mx-auto space-y-10">
        <div className="flex items-center gap-x-3">
          <div className="bg-[#A1C249] w-4 h-8" />
          <p className="text-[1.125rem] font-medium text-[#1A1A1A]">My Cart</p>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col">
            <div className="flex flex-col items-center py-20">
              <p className="text-xl text-gray-600">No item here yet</p>
              <Link to="/shop" className="mt-4 text-white bg-green-500 px-6 py-2 rounded-md">Continue Shopping</Link>
             </div>
              <JustForYou/>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="flex flex-col gap-y-5 md:gap-y-8">
              {/* Table Header */}
              <div className="hidden md:flex items-center justify-between md:justify-normal bg-white py-4 rounded-2xl shadow-md text-gray-700 font-semibold">
                <p className="text-center w-1/4 md:pl-20 lg:pl-0">Product</p>
                <p className="text-center w-1/4 md:pl-32 lg:pl-24">Price</p>
                <p className="text-center w-1/4 md:pl-16">Quantity</p>
                <p className="text-center w-1/4 lg:pl-16">Subtotal</p>
              </div>

              {/* Product List */}
              {cart.map((product) => (
                <div className="flex flex-col">
                  <div key={product.id} className="flex justify-between items-start md:items-center px-3 py-4 md:px-8 md:py-6 bg-white shadow-md rounded-md">
                    <div className="flex md:hidden items-center">
                      {/* <div className=""> */}
                        <img src={product?.images?.[0]} alt={product.name} className="w-16 h-16 object-contain" />
                      {/* </div> */}
                      <div className="flex flex-col gap-y-2">
                        <p className="font-medium text-[.9rem] text-gray-800">{product.name}</p>
                        <p className="text-gray-600 text-[.8rem]">${product.price}</p>
                      </div>
                    </div>
                    <div className="flex md:hidden items-start">
                      <div className="flex md:hidden flex-col gap-y-2 w-auto">
                        {/* Quantity Controls */}
                        <div className="flex items-center w-[90%] p-1 bg-[#E6E6E6] rounded-md">
                          <button
                            className="px-1 bg-white rounded-xs"
                            onClick={() => handleQuantityChange(product.id, "decrease")}
                          >
                            -
                          </button>
                          <span className="w-10 text-[.9rem] md:text-[1rem] text-center">{product.quantity || 1}</span> {/* Show default quantity of 1 if undefined */}
                          <button
                            className="px-1 bg-white rounded-md"
                            onClick={() => handleQuantityChange(product.id, "increase")}
                          >
                            +
                          </button>
                        </div>
                        {/* Subtotal */}
                        <p className="font-medium text-gray-800">${product.price * (product.quantity || 1)}</p> {/* Show default 1 if quantity is undefined */}
                      </div>
                      {/* Remove Button */}
                      <button
                      className="text-red-500"
                      onClick={() => handleRemoveProduct(product.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="hidden md:flex flex-col md:flex-row items-center lg:w-[25%] lg:gap-4">
                      <img src={product?.images?.[0]} alt={product.name} className="w-16 h-16 object-contain" />
                      <p className="font-semibold text-gray-800">{product.name}</p>
                    </div>

                    <p className="hidden md:block text-gray-600 lg:w-[10%] ">${product.price}</p>

                    {/* Quantity Controls */}
                    <div className="hidden md:flex items-center lg:mr-14 p-2 bg-[#E6E6E6] lg:w-[8%] rounded-lg">
                      <button
                        className="px-2 py-1 bg-white rounded-xs w-"
                        onClick={() => handleQuantityChange(product.id, "decrease")}
                      >
                        -
                      </button>
                      <span className="w-10 text-center">{product.quantity || 1}</span> {/* Show default quantity of 1 if undefined */}
                      <button
                        className="px-2 py-1 bg-white rounded-xs w-"
                        onClick={() => handleQuantityChange(product.id, "increase")}
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal and Remove Button */}
                    <div className="hidden md:flex justify-betwe items-center lg:w-[12%] gap-x-4 lg:pl-4">
                      <p className="font-semibold text-gray-800">${product.price * (product.quantity || 1)}</p> {/* Show default 1 if quantity is undefined */}
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-y-6 md:flex-row items-start justify-between w-full">
              {/* Coupon Section */}
              <div className="w-full flex md:flex-col gap-y-5 lg:flex-row justify-between lg:items-center space-x-4 lg:space-x-4 md:w-1/2 lg:w-3/7">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="px-4 py-2 border border-gray-300 rounded-md w-[55%] md:w-2/3"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-[#A1C249] hover:bg-[#83c249] text-white px-4 md:px-6 py-2 rounded-md w-[45%] md:w-2/3 lg:w-auto"
                >
                  Apply Coupon
                </button>
              </div>

              {/* Cart Summary */}
              <div className="flex flex-col gap-y-2 px-8 py-4 bg-white shadow-md rounded-md w-full md:w-[60%] lg:w-3/7">
                <div className="flex justify-between pb-3 border-b-2 border-gray-300">
                  <p className="font-semibold text-gray-800">Subtotal:</p>
                  <p className="text-gray-600">${calculateSubtotal()}</p>
                </div>
                <div className="flex justify-between pb-3 border-b-2 border-gray-300">
                  <p className="font-semibold text-gray-800">Shipping:</p>
                  <p className="text-gray-600">{shippingCost === 0 ? "Free" : `$${shippingCost}`}</p>
                </div>
                <div className="flex justify-between pb-3 border-b-2 border-gray-300">
                  <p className="font-semibold text-gray-800">Discount:</p>
                  <p className="text-gray-600">-${discount}</p>
                </div>
                <div className="flex justify-between ">
                  <p className="font-semibold text-gray-800">Total:</p>
                  <p className="text-gray-800">${calculateTotal()}</p>
                </div>

                <button className="lg:w-3/5 m-auto bg-[#A1C249] hover:bg-[#83c249] text-white px-6 py-2 rounded-md mt-2">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartsPage;
