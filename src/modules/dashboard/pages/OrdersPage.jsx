import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import useGetMyOrders  from "../api/use-get-my-orders";
import OrderCard from "../components/OrderCard";

const TABS = [
  { key: "created",   label: "Created" },
  { key: "paid",      label: "Paid" },
  { key: "delivered", label: "Delivered" },
];

/**
 * Filter logic:
 * - created:   isPaid === false && isDelivered === false
 * - paid:      isPaid === true  && isDelivered === false
 * - delivered: isDelivered === true
 */
const filterOrders = (orders, tab) => {
  switch (tab) {
    case "created":
      return orders.filter((o) => !o.isPaid && !o.isDelivered);
    case "paid":
      return orders.filter((o) => o.isPaid && !o.isDelivered);
    case "delivered":
      return orders.filter((o) => o.isDelivered);
    default:
      return orders;
  }
};

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState("created");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useGetMyOrders({ page, size: 20 });

  const allOrders = data?.data?.documents || [];
  const pagination = data?.data?.meta;
  const totalPages = pagination?.totalPages || 1;

  const filteredOrders = filterOrders(allOrders, activeTab);

  return (
    <div className="flex flex-col gap-6">

      {/* ── Header ── */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">My Orders</h1>
        <p className="text-sm text-gray-500">Track and manage your orders.</p>
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center gap-4 border-b border-gray-200">
        {TABS.map((tab) => {
          const count = filterOrders(allOrders, tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "text-[#A1C249] border-b-2 border-[#A1C249]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span className={`ml-1.5 text-[.85rem] px-1.5 py-0.5 rounded-full font-semibold ${
                  activeTab === tab.key
                    ? " text-[#A1C249]"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Loading ── */}
      {isLoading && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {/* ── Error ── */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 gap-3">
          <ShoppingBag size={36} strokeWidth={1.2} />
          <p className="text-sm">Failed to load orders. Please try again.</p>
          <button
            onClick={() => refetch()}
            className="text-sm text-[#A1C249] underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* ── Empty state ── */}
      {!isLoading && !isError && filteredOrders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
            <ShoppingBag size={24} className="text-[#A1C249]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">
              No {activeTab} orders yet
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {activeTab === "created"
                ? "Orders you've placed will appear here."
                : activeTab === "paid"
                ? "Orders with successful payment will appear here."
                : "Orders marked as delivered will appear here."}
            </p>
          </div>
        </div>
      )}

      {/* ── Order list ── */}
      {!isLoading && !isError && filteredOrders.length > 0 && (
        <div className="flex flex-col gap-8 md:gap-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} tab={activeTab} />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">{page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
