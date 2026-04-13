// src/pages/ForgotPassword.jsx

import React from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRequestOtp } from "@/features/auth/api/use-request-otp"

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { mutate, isPending } = useRequestOtp()

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email, try again")
        .required("Email is required"),
    }),
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      mutate(values.email.trim(), {
        onSuccess: () => {
          localStorage.setItem("resetEmail", values.email.trim())
          navigate("/forgot-password/verify")
        },
        onError: (error) => {
          const message = error?.response?.data?.message || "No account found with this email"
          setFieldError("email", message)
        },
      })
      setSubmitting(false)
    },
  })

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-sm bg-white rounded-3xl px-6 pt-10 pb-8 border-2 border-[#A1C249]">
        <h1 className="text-xl font-semibold text-black text-center">Forget Password</h1>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Enter your email address below to proceed.
        </p>

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <label className="text-xs text-gray-500">Email address</label>
            <input
              type="email"
              name="email"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors bg-[#F8F8F8] ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-lime-500"
              }`}
              placeholder="Enter email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                {formik.errors.email}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting || isPending}
            className="w-full rounded-full bg-lime-500 py-3 text-sm font-semibold text-black active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting || isPending ? "Sending..." : "Proceed"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-6 w-full text-xs text-center text-gray-400"
        >
          Back to login
        </button>
      </div>
    </div>
  )
}