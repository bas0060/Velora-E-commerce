import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useVerifyPayment from "../api/use-verify-payment"; // adjust path
import { CircleCheck, CircleX, Mail, Phone } from "lucide-react"; // Importing a spinner from lucide-react
import BackButton from "@/modules/home/components/ui/BackButton";

const currency = (n) =>
  `₦${Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

const OrderConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const reference = searchParams.get("reference") || searchParams.get("trxref");

  const { data, isLoading, isError } = useVerifyPayment(reference);

  const order = data?.order;

  if (isLoading) {
    return (
      <div className="p-10 animate-pulse space-y-6 max-w-3xl mx-auto">
        <div className="h-6 w-1/3 bg-gray-200 rounded" />
        <div className="h-32 bg-gray-200 rounded" />
        <div className="h-48 bg-gray-200 rounded" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="p-10 text-center space-y-4">
        <CircleX className="w-16 h-16 mx-auto text-red-400" strokeWidth={1} />
        <p className="text-lg font-semibold text-gray-800">
          We couldn't verify your payment.
        </p>
        <p className="text-sm text-gray-500">
          Don't worry — if your payment went through, your order has been saved.
          Please check your email or contact support.
        </p>
        <button
          onClick={() => navigate("/dashboard/orders")}
          className="mt-4 bg-black text-white px-6 py-3 rounded-full text-sm font-medium"
        >
          View my orders
        </button>
      </div>
    );
  }

  const shipping = order.shippingAddress || {};

  return (
    <div className="py-4 md:p-8 lg:p-8">
      <div className="pb-4">
        <BackButton onClick={() => navigate("/orders")} /> {/* Back Button to /orders */}
      </div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          {/* HEADER */}
          <div className="flex gap-4 items-center">
            <CircleCheck strokeWidth={1} className="w-16 h-16 text-[#A1C249]" />
            <div>
              <h2 className="text-xl font-semibold">Your order is confirmed</h2>
              <p className="text-sm text-gray-500">
                {order.isPaid ? "Payment successful" : "Payment pending"}
              </p>
            </div>
          </div>

          {/* CONFIRM MESSAGE */}
          <div className="text-sm text-gray-500 space-y-2">
            <div>
              <p className="font-semibold text-gray-900">Thank you for your order!</p>
              <p className="text-sm text-gray-500">Order ID: {order._id}</p>
            </div>
            {order.paymentResult?.email_address && (
              <p>
                An order confirmation has been sent to{" "}
                <span className="font-medium text-black">
                  {order.paymentResult.email_address}
                </span>
              </p>
            )}
          </div>

          {/* ORDER DETAILS */}
          <div>
            <h3 className="font-semibold mb-3">Order details</h3>
            <div className="border rounded-xl p-6 space-y-4 text-sm">
              {/* SHIPPING */}
              <div>
                <p className="font-medium mb-1">Shipping address</p>
                <p>{shipping.address}</p>
                <p>{shipping.city}{shipping.postalCode ? `, ${shipping.postalCode}` : ""}</p>
                <p>{shipping.country}</p>
              </div>

              {/* PAYMENT METHOD */}
              <div>
                <p className="font-medium mb-1">Payment method</p>
                <p>{order.paymentMethod}</p>
              </div>

              {/* DELIVERY STATUS */}
              <div>
                <p className="font-medium mb-1">Delivery status</p>
                <p>{order.isDelivered ? `Delivered at ${new Date(order.deliveredAt).toLocaleString()}` : "Pending delivery"}</p>
              </div>
            </div>
          </div>

          <hr />

          {/* SUPPORT */}
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900">Need assistance?</p>
              <p className="text-sm text-gray-500">Don't worry, we can help!</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="w-4 h-4" />
                <span>+2349064028886</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4" />
                <span>support@velora.com</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="w-full md:w-2/3 bg-black text-white py-3 rounded-full text-sm font-medium"
            >
              Continue shopping
            </button>
          </div>
        </div>

        <div className="border-l pl-6 space-y-6">
          <h3 className="font-semibold">Order summary</h3>
          {/* ITEMS */}
          <div className="space-y-4">
            {order.orderItems?.map((item, index) => (
              <div key={index} className="flex gap-4 text-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded object-cover border"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">Qty: {item.qty}</p>
                </div>
                <p className="font-medium">{currency(item.price * item.qty)}</p>
              </div>
            ))}
          </div>

          <hr />

          {/* TOTALS */}
          <div className="space-y-2 text-sm">
            <Row label="Subtotal" value={currency(order.itemsPrice)} />
            <Row label="Shipping" value={currency(order.shippingPrice)} />
            <Row label="Tax" value={currency(order.taxPrice)} />
            <Row label="Total" value={currency(order.totalPrice)} bold />
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value, bold }) => (
  <div className={`flex justify-between ${bold ? "font-semibold text-base" : ""}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default OrderConfirmationPage;