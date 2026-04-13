import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { useDeleteAddress } from "@/modules/dashboard/api/use-delete-address";

/**
 * DeleteAddressModal
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - address: address object { _id, street, city, state, country, ... }
 */
const DeleteAddressModal = ({ open, onClose, address }) => {
  const { mutate: deleteAddress, isPending } = useDeleteAddress();

  if (!open || !address) return null;

  const closeModal = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleDelete = () => {
    deleteAddress(address._id, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div className="bg-white rounded-2xl w-[92%] max-w-md p-6 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-900">Delete Address</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Address preview */}
        <div className="mb-5 p-4 bg-gray-50 rounded-xl text-sm text-gray-700 space-y-1">
          <p className="font-medium">{address.street}</p>
          <p className="text-gray-500">
            {[address.city, address.state, address.country]
              .filter(Boolean)
              .join(", ")}
          </p>
          {address.zipCode && (
            <p className="text-gray-400 text-xs">{address.zipCode}</p>
          )}
        </div>

        {/* Warning */}
        <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
          <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 leading-relaxed">
            Deleting this address will not affect any pending orders already
            dispatched to this address.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold disabled:opacity-50 transition-colors"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAddressModal;
