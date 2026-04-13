import React from "react";

const ConfirmLogoutModal = ({ onConfirm, onCancel, isLoading }) => {
  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen backdrop-blur-sm flex justify-center items-center z-50 ${open ? 'block' : 'hidden'}`}
      onClick={closeModal}
    >
      <div className="bg-white rounded-2xl px-6 py-5 w-[90%] max-w-sm shadow-lg">
        <h2 className="text-base font-semibold text-gray-900">
          Log out of this account?
        </h2>
        <p className="mt-2 text-xs text-gray-600">
          You will need to log in again to access your Velora account.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-xs rounded-full border border-gray-300 text-gray-700 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-xs rounded-full bg-red-500 text-white font-semibold disabled:opacity-50"
          >
            {isLoading ? "Logging out..." : "Yes, log out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
