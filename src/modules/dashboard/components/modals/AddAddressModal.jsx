import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { X } from "lucide-react";
import  useCreateAddress  from "../../api/use-create-address";
import { useUpdateAddress } from "../../api/use-update-address";
import { useFetchStates } from "../../api/use-fetch-states";
import { useFetchCities } from "../../api/use-fetch-cities";

const validationSchema = yup.object({
  street: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipCode: yup.string().required("Zip code is required"),
  country: yup.string().required("Country is required"),
});

const AddAddressModal = ({ open, onClose, addressToEdit = null }) => {
  const isEditMode = Boolean(addressToEdit);

  const { mutateAsync: createAddress } = useCreateAddress();
  const { mutateAsync: updateAddress } = useUpdateAddress();

  const { states, fetchStates, isLoading: isLoadingStates } = useFetchStates();
  const { cities, fetchCities, isLoading: isLoadingCities } = useFetchCities();

  const formik = useFormik({
    initialValues: {
      street: addressToEdit?.street ?? "",
      city: addressToEdit?.city ?? "",
      state: addressToEdit?.state ?? "",
      zipCode: addressToEdit?.zipCode ?? "",
      country: addressToEdit?.country ?? "Nigeria",
      isDefault: addressToEdit?.isDefault ?? false,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const payload = {
        street: values.street.trim(),
        city: values.city.trim(),
        state: values.state.trim(),
        zipCode: values.zipCode.trim(),
        country: values.country.trim(),
        isDefault: values.isDefault,
      };

      try {
        if (isEditMode) {
          await updateAddress({ addressId: addressToEdit._id, payload });
        } else {
          await createAddress(payload);
        }
        resetForm();
        onClose();
      } catch {
        // errors handled inside hooks via toast
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Load states when modal opens
  useEffect(() => {
    if (open) fetchStates();
  }, [open, fetchStates]);

  // Load cities when state changes
  useEffect(() => {
    if (formik.values.state) {
      fetchCities(formik.values.state);
    }
  }, [formik.values.state, fetchCities]);

  if (!open) return null;

  const closeModal = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors bg-[#F8F8F8] ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-gray-200 focus:border-gray-400"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div className="bg-white rounded-2xl w-[92%] max-w-md p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-gray-900">
            {isEditMode ? "Edit Address" : "Add New Address"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Street */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Street address</label>
            <input
              name="street"
              type="text"
              placeholder="123 Main Street"
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass("street")}
            />
            {formik.touched.street && formik.errors.street && (
              <p className="text-xs text-red-500">{formik.errors.street}</p>
            )}
          </div>

          {/* State + City side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-500">State</label>
              <select
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass("state")}
              >
                <option value="">Select State</option>
                {isLoadingStates ? (
                  <option>Loading...</option>
                ) : (
                  states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))
                )}
              </select>
              {formik.touched.state && formik.errors.state && (
                <p className="text-xs text-red-500">{formik.errors.state}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">City</label>
              <select
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass("city")}
                disabled={!formik.values.state}
              >
                <option value="">Select City</option>
                {isLoadingCities ? (
                  <option>Loading...</option>
                ) : (
                  cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))
                )}
              </select>
              {formik.touched.city && formik.errors.city && (
                <p className="text-xs text-red-500">{formik.errors.city}</p>
              )}
            </div>
          </div>

          {/* Zip Code + Country side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-500">Zip code</label>
              <input
                name="zipCode"
                type="text"
                placeholder="10001"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass("zipCode")}
              />
              {formik.touched.zipCode && formik.errors.zipCode && (
                <p className="text-xs text-red-500">{formik.errors.zipCode}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">Country</label>
              <input
                name="country"
                type="text"
                placeholder="Nigeria"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass("country")}
              />
              {formik.touched.country && formik.errors.country && (
                <p className="text-xs text-red-500">{formik.errors.country}</p>
              )}
            </div>
          </div>

          {/* Set as default */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              name="isDefault"
              checked={formik.values.isDefault}
              onChange={formik.handleChange}
              className="w-4 h-4 accent-[#FF9D21]"
            />
            <span className="text-sm text-gray-600">Set as default address</span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={formik.isSubmitting}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex-1 py-3 rounded-xl bg-[#FF9D21] hover:bg-[#e8881a] text-white text-sm font-semibold disabled:opacity-50 transition-colors"
            >
              {formik.isSubmitting
                ? isEditMode ? "Updating..." : "Saving..."
                : isEditMode ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal