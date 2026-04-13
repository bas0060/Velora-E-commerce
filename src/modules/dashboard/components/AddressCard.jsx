import React, { useState } from "react";
import { toast } from "react-toastify";
import { Copy, Check } from "lucide-react";
import { useSetDefaultAddress } from "@/modules/dashboard/api/use-set-default-address";
import AddAddressModal from "@/modules/dashboard/components/modals/AddAddressModal";
import DeleteAddressModal from "@/modules/dashboard/components/modals/DeleteAddressModal";

/**
 * AddressCard
 * Props:
 * - address: { _id, street, city, state, zipCode, country, isDefault }
 */
const AddressCard = ({ address }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { mutate: setDefault, isPending: isSettingDefault } =
    useSetDefaultAddress();

  const handleSetDefault = () => {
    if (address.isDefault) return;
    setDefault(address._id);
  };

  const handleCopy = () => {
    const text = [address.street, address.city, address.state, address.country]
      .filter(Boolean)
      .join(", ");
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4 py-4 px-4 md:py-5 md:px-6 border border-gray-200 rounded-xl bg-white">

        {/* ── Address info ── */}
        <div className="flex flex-col gap-1.5">
          <p className="font-semibold text-sm md:text-base text-gray-900">
            {address.street}
          </p>
          <p className="text-sm text-gray-500">
            {[address.city, address.state, address.country]
              .filter(Boolean)
              .join(", ")}
          </p>
          {address.zipCode && (
            <p className="text-xs text-gray-400">{address.zipCode}</p>
          )}
        </div>

        {/* ── Footer row ── */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          {/* Default radio */}
          {address.isDefault ? (
            <label className="flex items-center gap-2 cursor-default">
              <input
                type="radio"
                checked
                readOnly
                className="bg-[#A1C249] w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-800">Default</span>
            </label>
          ) : (
            <label
              className="flex items-center gap-2 cursor-pointer group"
              onClick={handleSetDefault}
            >
              <input
                type="radio"
                checked={false}
                readOnly
                disabled={isSettingDefault}
                className="cursor-pointer w-4 h-4"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {isSettingDefault ? "Saving..." : "Set as default"}
              </span>
            </label>
          )}

          {/* Actions */}
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <ActionBtn onClick={() => setIsDeleteOpen(true)} label="Delete" />
            <Divider />
            <ActionBtn
              onClick={handleCopy}
              label={copied ? "Copied!" : "Copy"}
              icon={copied ? <Check size={13} /> : <Copy size={13} />}
            />
            <Divider />
            <ActionBtn onClick={() => setIsEditOpen(true)} label="Edit" />
          </div>
        </div>
      </div>

      {/* Edit modal */}
      <AddAddressModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        addressToEdit={address}
      />

      {/* Delete modal */}
      <DeleteAddressModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        address={address}
      />
    </>
  );
};

/* ── Small helpers ── */

const ActionBtn = ({ onClick, label, icon }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors text-sm"
  >
    {icon}
    {label}
  </button>
);

const Divider = () => <span className="text-gray-300 select-none">|</span>;

export default AddressCard;
