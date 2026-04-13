import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAddresses } from "@/modules/dashboard/api/use-get-address";
import useCheckout from "@/modules/home/api/use-checkout";
import AddAddressModal from "@/modules/dashboard/components/modals/AddAddressModal";
import AddressCard from "@/modules/dashboard/components/AddressCard";
import { ShieldCheck, Plus } from "lucide-react";
import BackButton from "@/modules/home/components/ui/BackButton";

const currency = (n) =>
  `₦${Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { items = [], orderSummary = {} } = location.state || {};

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const { data, isLoading: isLoadingAddresses } = useGetAddresses({ page: 1, size: 20 });
  const { checkout, isLoading: isCheckingOut } = useCheckout();

  // ── Correct data path ──
  const addresses = data?.data?.documents || [];

  // Default address always first
  const sortedAddresses = [...addresses].sort((a, b) =>
    a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
  );

  // Auto-select default address once loaded
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr._id);
    }
  }, [addresses]);

  const selectedAddress = addresses.find((a) => a._id === selectedAddressId);

  const handlePay = () => {
    if (!selectedAddressId || !selectedAddress) {
      return;
    }
    checkout({
        items,
        shippingAddress: {
            address: selectedAddress.street,
            city: selectedAddress.city,
        postalCode: selectedAddress.zipCode,
        country: selectedAddress.country,
    },
});
    console.log("items going to checkout:", items); 
  };

  // ── No items guard ──
  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-gray-500">No items to checkout.</p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-black text-white px-6 py-2 rounded-full text-sm"
        >
          Go to shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] py-6 md:py-10">
      <div className="pl-6 pb-6 lg:pl-12 md:pb-8">
        <BackButton/>
      </div>
      <div className="w-[92%] max-w-6xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8">
        {/* ── LEFT: Shipping Address ── */}
        <div className="bg-white rounded-2xl p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
              Shipping Address
            </h2>
            <button
              onClick={() => setIsAddressModalOpen(true)}
              className="flex items-center gap-1.5 text-sm text-[#FF9D21] font-medium hover:underline"
            >
              <Plus size={15} />
              Add new
            </button>
          </div>

          {isLoadingAddresses ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm space-y-2">
              <p>You have no saved addresses.</p>
              <button
                onClick={() => setIsAddressModalOpen(true)}
                className="text-[#FF9D21] font-medium"
              >
                + Add new address
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedAddresses.map((addr) => (
                <div
                  key={addr._id}
                  onClick={() => setSelectedAddressId(addr._id)}
                  className={`cursor-pointer rounded-xl border-2 transition-colors ${
                    selectedAddressId === addr._id
                      ? "border-[#FF9D21]"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <AddressCard address={addr} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Order Summary ── */}
        <div className="bg-white rounded-2xl p-4 md:p-6 space-y-5 md:space-y-6">
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            Order Summary
          </h2>

          {/* Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 md:gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover border border-gray-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Units: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900 shrink-0">
                  {currency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <hr />

          {/* Totals */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{currency(orderSummary.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{currency(orderSummary.shipping)}</span>
            </div>
            <div className="flex justify-between text-gray-900 font-semibold text-base pt-2 border-t">
              <span>Total</span>
              <span>{currency(orderSummary.total)}</span>
            </div>
          </div>

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={isCheckingOut || !selectedAddressId}
            className="w-full bg-[#FF9D21] hover:bg-[#e8881a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 md:py-4 rounded-xl transition-colors text-sm"
          >
            {isCheckingOut
              ? "Processing..."
              : `Pay ${currency(orderSummary.total)}`}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <ShieldCheck size={14} />
            <span>Secure encrypted payment</span>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <AddAddressModal
        open={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />
    </div>
  );
};

export default CheckoutPage;
