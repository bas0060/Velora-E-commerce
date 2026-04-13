import React, { useState } from "react";
import { Plus, MapPin } from "lucide-react";
import { useGetAddresses } from "../api/use-get-address";
import AddressCard from "../components/AddressCard";
import AddAddressModal from "@/modules/dashboard/components/modals/AddAddressModal";

const AddressesPage = () => {
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useGetAddresses({ page, size: 10 });

    const addresses = data?.data?.documents || [];  // ← was data?.data
    const pagination = data?.data?.meta;            // ← was data?.pagination
    const totalPages = pagination?.totalPages || 1;

  return (
    <div className="flex flex-col gap-6">

      {/* ── Page header ── */}
      <div className="flex items-start lg:items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Addresses
          </h1>
          <p className="text-sm text-gray-500 mt-0.5 w-[85%] md:w-full">
            Manage your saved delivery addresses.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-[#A1C249] hover:bg-[#49c251] hover:cursor-pointer transition-colors text-white text-sm font-semibold px-4 py-2.5 md:px-5 md:py-3 rounded-xl"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add a new address</span>
          <span className="sm:hidden">Add</span>
        </button>

        {/* Modal mounted alongside its trigger button */}
        <AddAddressModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>

      {/* ── Loading skeleton ── */}
      {isLoading && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 md:h-24 bg-gray-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* ── Error ── */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 gap-3">
          <MapPin size={36} strokeWidth={1.2} />
          <p className="text-sm">Failed to load addresses. Please try again.</p>
          <button
            onClick={() => refetch()}
            className="text-sm text-[#A1C249] underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* ── Empty state ── */}
      {!isLoading && !isError && addresses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
            <MapPin size={24} className="text-[#A1C249]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">No addresses yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Add a delivery address to get started.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2  bg-[#A1C249] hover:bg-[#49c251] hover:cursor-pointer text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <Plus size={16} />
            Add address
          </button>
        </div>
      )}

      {/* ── Address list ── */}
      {!isLoading && !isError && addresses.length > 0 && (
        <div className="flex flex-col gap-3 md:gap-4">
          {addresses.map((address) => (
            <AddressCard key={address._id} address={address} />
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
          <span className="text-sm text-gray-500">
            {page} of {totalPages}
          </span>
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

export default AddressesPage;
