import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReviewModal } from "@/modules/home/components/modals/ReviewModal";
import useInitializePayment from "@/modules/dashboard/api/use-initialize-payment";
import { useGetUserProfile } from "@/api/use-get-user-data";
import { toast } from "react-toastify";

const currency = (n) =>
  `₦${Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

/**
 * OrderCard
 * Props:
 * - order: full order object from /orders/my-orders
 * - tab: "created" | "paid" | "delivered"
 */
const OrderCard = ({ order, tab }) => {
  const navigate = useNavigate();
  const [reviewProductId, setReviewProductId] = useState(null);

  const { data: user } = useGetUserProfile();
  const { mutate: initializePayment, isPending: isInitializingPayment } = useInitializePayment();

  const {
    _id,
    orderItems = [],
    totalPrice,
    itemsPrice,
    shippingPrice,
    createdAt,
    isPaid,
    isDelivered,
  } = order;

  // ── Status badge ──
  const statusBadge = isDelivered
    ? { label: "Delivered", color: "text-green-600 bg-green-50" }
    : isPaid
    ? { label: "Paid", color: "text-blue-600 bg-blue-50" }
    : { label: "Created", color: "text-green-700 bg-[#aec57049]" };

  // ── Created tab: reuse existing orderId, skip createOrder entirely ──
  const handlePayExistingOrder = () => {
    if (!user?.email) {
      toast.error("Unable to retrieve your account details. Please log in again.");
      return;
    }
    initializePayment(
      { orderId: _id, email: user.email },
      {
        onSuccess: (payRes) => {
          const authUrl = payRes?.data?.authorization_url;
          if (!authUrl) {
            toast.error("Payment initialization failed. Please try again.");
            return;
          }
          window.location.href = authUrl;
        },
        onError: () => {
          toast.error("Payment failed. Please try again.");
        },
      }
    );
  };

  // ── Paid/Delivered tab: navigate to checkout to create a fresh order ──
  const handleBuyAgain = () => {
    const items = orderItems.map((item) => ({
      id: item.product,
      quantity: item.qty,
      name: item.name,
      image: item.image,
      price: item.price,
    }));

    navigate("/checkout", {
      state: {
        items,
        orderSummary: {
          subtotal: itemsPrice || totalPrice,
          shipping: shippingPrice || 0,
          total: totalPrice,
        },
      },
    });
  };

  const isCreated = tab === "created";
  const buyLabel = isCreated ? "Buy this item" : "Buy item again";

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 flex flex-col gap-4">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <p className="text-xs text-gray-400">
              Order ID:{" "}
              <span className="font-medium text-gray-600">{_id}</span>
            </p>
            {createdAt && (
              <p className="text-xs text-gray-400">
                {new Date(createdAt).toLocaleDateString("en-NG", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
          <span
            className={`text-[.85rem] font-semibold px-3 py-2 rounded-[.8rem] ${statusBadge.color}`}
          >
            {statusBadge.label}
          </span>
        </div>

        {/* ── Product images side by side ── */}
        <div className="flex items-center gap-2 flex-wrap">
          {orderItems.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover border border-gray-100"
            />
          ))}
        </div>

        {/* ── Summary row ── */}
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-500">
            {orderItems.length} {orderItems.length === 1 ? "item" : "items"}
          </p>
          <p className="font-semibold text-gray-900">{currency(totalPrice)}</p>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-col sm:flex-row gap-2">

          {/* View details */}
          <button
            onClick={() => navigate(`/dashboard/orders/${_id}`)}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 hover:bg-[#e4e4e4] transition-colors"
          >
            View order details
          </button>

          {/* Buy — created tab pays existing order, others create new */}
          <button
            onClick={isCreated ? handlePayExistingOrder : handleBuyAgain}
            disabled={isCreated && isInitializingPayment}
            className="flex-1 py-2.5 rounded-xl bg-[#A1C249] hover:bg-[#49c251] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
          >
            {isCreated && isInitializingPayment ? "Processing..." : buyLabel}
          </button>

          {/* Review */}
          <button
            onClick={() => setReviewProductId(orderItems[0]?.product)}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 hover:bg-[#e4e4e4] transition-colors"
          >
            Review item
          </button>
        </div>
      </div>

      {/* Review Modal */}
      {reviewProductId && (
        <ReviewModal
          open={!!reviewProductId}
          onClose={() => setReviewProductId(null)}
          productId={reviewProductId}
        />
      )}
    </>
  );
};

export default OrderCard;
