import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderById } from "../api/use-get-order-by-id";
import { ReviewModal } from "@/modules/home/components/modals/ReviewModal";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const currency = (n) =>
  `₦${Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [reviewProductId, setReviewProductId] = useState(null);

  const { data, isLoading, isError } = useGetOrderById(orderId);
  const order = data?.data;

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-6 w-1/3 bg-gray-200 rounded" />
        <div className="h-40 bg-gray-200 rounded-xl" />
        <div className="h-60 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  // ── Error ──
  if (isError || !order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <p className="text-gray-500 text-sm">Order not found.</p>
        <button
          onClick={() => navigate("/dashboard/orders")}
          className="text-sm text-[#FF9D21] underline"
        >
          Back to orders
        </button>
      </div>
    );
  }

  const {
    _id,
    orderItems = [],
    shippingAddress = {},
    paymentMethod,
    paymentResult,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
    createdAt,
  } = order;

  const statusBadge = isDelivered
    ? { label: "Delivered", color: "text-green-600 bg-green-50 border-green-200" }
    : isPaid
    ? { label: "Paid", color: "text-blue-600 bg-blue-50 border-blue-200" }
    : { label: "Created", color: "text-orange-600 bg-orange-50 border-orange-200" };

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

  return (
    <>
      <div className="flex flex-col gap-6 pb-10">

        {/* ── Back + Header ── */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard/orders")}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
              Order Details
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">ID: {_id}</p>
          </div>
          <span className={`ml-auto text-xs font-semibold px-3 py-1 rounded-full border ${statusBadge.color}`}>
            {statusBadge.label}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-5">

            {/* Order items */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 space-y-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Items ({orderItems.length})
              </h2>
              <div className="divide-y divide-gray-100">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex gap-3 md:gap-4 py-3 first:pt-0 last:pb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Qty: {item.qty}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 mt-1">
                        {currency(item.price * item.qty)}
                      </p>
                    </div>

                    {/* Review button per item */}
                    <button
                      onClick={() => setReviewProductId(item.product)}
                      className="self-center text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors shrink-0"
                    >
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping address */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 space-y-2">
              <h2 className="text-sm font-semibold text-gray-900">
                Delivery Address
              </h2>
              <p className="text-sm text-gray-600">{shippingAddress.address}</p>
              <p className="text-sm text-gray-500">
                {[shippingAddress.city, shippingAddress.postalCode, shippingAddress.country]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>

            {/* Dates */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 space-y-3">
              <h2 className="text-sm font-semibold text-gray-900">Timeline</h2>
              <div className="space-y-2 text-sm">
                {createdAt && (
                  <Row
                    label="Order placed"
                    value={new Date(createdAt).toLocaleDateString("en-NG", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  />
                )}
                {isPaid && paidAt && (
                  <Row
                    label="Payment confirmed"
                    value={new Date(paidAt).toLocaleDateString("en-NG", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                    highlight
                  />
                )}
                {isDelivered && deliveredAt && (
                  <Row
                    label="Delivered"
                    value={new Date(deliveredAt).toLocaleDateString("en-NG", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                    highlight
                  />
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="flex flex-col gap-5">

            {/* Payment summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 space-y-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Payment Summary
              </h2>
              <div className="space-y-2 text-sm">
                <Row label="Subtotal"  value={currency(itemsPrice)} />
                <Row label="Shipping"  value={currency(shippingPrice)} />
                {taxPrice > 0 && <Row label="Tax" value={currency(taxPrice)} />}
                <div className="pt-2 border-t">
                  <Row label="Total" value={currency(totalPrice)} bold />
                </div>
              </div>

              {/* Payment method */}
              <div className="pt-3 border-t space-y-1">
                <p className="text-xs text-gray-400">Payment method</p>
                <p className="text-sm font-medium text-gray-800">{paymentMethod}</p>
                {paymentResult?.email_address && (
                  <p className="text-xs text-gray-400">{paymentResult.email_address}</p>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
                <ShieldCheck size={13} />
                <span>Secure encrypted payment</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleBuyAgain}
                className="w-full py-3 rounded-xl bg-[#A1C249] hover:bg-[#49c251] text-white text-sm font-semibold transition-colors"
              >
                {isPaid || isDelivered ? "Buy item again" : "Buy this item"}
              </button>
            </div>
          </div>
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

const Row = ({ label, value, bold, highlight }) => (
  <div className={`flex justify-between ${bold ? "font-semibold text-base" : ""}`}>
    <span className={highlight ? "text-green-600" : "text-gray-500"}>{label}</span>
    <span className={highlight ? "text-green-600 font-medium" : "text-gray-800"}>{value}</span>
  </div>
);

export default OrderDetailPage;
