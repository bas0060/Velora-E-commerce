import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import JustForYou from "@/modules/home/components/JustForYou";
import { X } from "lucide-react";

const CartsPage = () => {
  const { cart, removeFromCart, updateCartQuantity } = useCart();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  const calculateSubtotal = () =>
    cart.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);

  const calculateTotal = () => calculateSubtotal() + shippingCost - discount;

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

  const handleRemoveProduct = (productId) => removeFromCart(productId);

  const handleQuantityChange = (productId, action) =>
    updateCartQuantity(productId, action);

  const handleShippingCost = () => {
    const subtotal = calculateSubtotal();
    setShippingCost(subtotal > 100 ? 0 : 10);
  };

  useEffect(() => {
    handleShippingCost();
  }, [cart]);

  // ── Checkout handler — passes all cart items to CheckoutPage via state ──
  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;

    navigate("/checkout", {
      state: {
        items: cart.map((product) => ({
          id: product.id,
          quantity: product.quantity || 1,
          name: product.name,
          image: product.images?.[0], // cart stores images as array
          price: product.price,
        })),
        orderSummary: {
          subtotal: calculateSubtotal(),
          shipping: shippingCost,
          total: calculateTotal(),
        },
      },
    });
  };

  return (
    <section className="bg-[#F8F8F8] pt-4 lg:pt-0 pb-16">
      <div className="w-[90%] mx-auto space-y-7 md:space-y-10">
        <div className="flex items-center gap-x-3">
          <div className="bg-[#A1C249] w-4 h-8" />
          <p className="text-[1.125rem] font-medium text-[#1A1A1A]">My Cart</p>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col">
            <div className="flex flex-col items-center py-20">
              <p className="text-xl text-gray-600">No item here yet</p>
              <Link
                to="/shop"
                className="mt-4 text-white bg-green-500 px-6 py-2 rounded-md"
              >
                Continue Shopping
              </Link>
            </div>
            <JustForYou />
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
                <div key={product.id} className="flex flex-col">
                  <div className="flex justify-between items-start md:items-center px-3 py-4 md:px-8 md:py-6 bg-white shadow-md rounded-md">

                    {/* ── Mobile layout ── */}
                    <div className="flex md:hidden justify-between items-start w-full">
                      <div className="md:hidden flex flex-col gap-6 w-full">
                        <div className="flex items-start gap-8">
                          <img
                            src={product?.images?.[0]}
                            alt={product.name}
                            className="w-20 h-16 object-cover"
                          />
                          <div className="flex flex-col gap-y-2">
                            <p className="font-medium text-[.9rem] text-gray-800">
                              {product.name}
                            </p>
                            <p className="text-gray-600 text-[.8rem]">
                              ₦{product.price}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center gap-8">
                            <div className="flex items-center w-[90%] p-1 bg-[#E6E6E6] rounded-md">
                              <button
                                className="px-1 bg-white rounded-xs"
                                onClick={() => handleQuantityChange(product.id, "decrease")}
                              >
                                -
                              </button>
                              <span className="w-10 text-[.9rem] text-center">
                                {product.quantity || 1}
                              </span>
                              <button
                                className="px-1 bg-white rounded-md"
                                onClick={() => handleQuantityChange(product.id, "increase")}
                              >
                                +
                              </button>
                            </div>
                            <p className="font-medium text-gray-800">
                              ₦{product.price * (product.quantity || 1)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <X  size={24} />
                      </button>
                    </div>

                    {/* ── Desktop layout ── */}
                    <div className="hidden md:flex flex-col md:flex-row items-center lg:w-[25%] lg:gap-4">
                      <img
                        src={product?.images?.[0]}
                        alt={product.name}
                        className="w-16 h-16 object-contain"
                      />
                      <p className="font-semibold text-gray-800">{product.name}</p>
                    </div>

                    <p className="hidden md:block text-gray-600 lg:w-[10%]">
                      ₦{product.price}
                    </p>

                    <div className="hidden md:flex items-center lg:mr-14 p-2 bg-[#E6E6E6] lg:w-[8%] rounded-lg">
                      <button
                        className="px-2 py-1 bg-white rounded-xs"
                        onClick={() => handleQuantityChange(product.id, "decrease")}
                      >
                        -
                      </button>
                      <span className="w-10 text-center">{product.quantity || 1}</span>
                      <button
                        className="px-2 py-1 bg-white rounded-xs"
                        onClick={() => handleQuantityChange(product.id, "increase")}
                      >
                        +
                      </button>
                    </div>

                    <div className="hidden md:flex justify-between items-center lg:w-[12%] gap-x-4 lg:pl-4">
                      <p className="font-semibold text-gray-800">
                        ₦{product.price * (product.quantity || 1)}
                      </p>
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <X  size={20} />
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
                  <p className="text-gray-600">₦{calculateSubtotal()}</p>
                </div>
                <div className="flex justify-between pb-3 border-b-2 border-gray-300">
                  <p className="font-semibold text-gray-800">Shipping:</p>
                  <p className="text-gray-600">
                    {shippingCost === 0 ? "Free" : `₦${shippingCost}`}
                  </p>
                </div>
                <div className="flex justify-between pb-3 border-b-2 border-gray-300">
                  <p className="font-semibold text-gray-800">Discount:</p>
                  <p className="text-gray-600">-₦{discount}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800">Total:</p>
                  <p className="text-gray-800">₦{calculateTotal()}</p>
                </div>

                {/* ── Updated checkout button ── */}
                <button
                  onClick={handleProceedToCheckout}
                  className="lg:w-3/5 m-auto bg-[#A1C249] hover:bg-[#83c249] text-white px-6 py-2 rounded-md mt-2"
                >
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
