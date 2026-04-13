// src/pages/ForgotVerifyOtp.jsx

import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useVerifyOtp } from "@/features/auth/api/use-verify-otp"

function maskEmail(email) {
  if (!email) return ""
  const [name, domain] = email.split("@")
  if (!domain) return email
  const firstChar = name[0] || ""
  return `${firstChar}${"*".repeat(Math.max(name.length - 1, 5))}@${domain}`
}

export default function ForgotVerifyOtp() {
  const navigate = useNavigate()
  const email = localStorage.getItem("resetEmail")
  const { mutate, isPending } = useVerifyOtp()

  const [timeLeft, setTimeLeft] = useState(4 * 60)
  const inputsRef = useRef([])

  useEffect(() => {
    if (timeLeft === 0) return
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [timeLeft])

  const minutes = String(Math.floor(timeLeft / 60)).padStart(1, "0")
  const seconds = String(timeLeft % 60).padStart(2, "0")

  const formik = useFormik({
    initialValues: { otp: ["", "", "", "", ""] },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().matches(/^\d$/, "Must be a digit").required("Required"))
        .min(5)
        .test("all-filled", "OTP must be 5 digits", (val) =>
          val?.every((d) => d !== "")
        ),
    }),
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      const code = values.otp.join("")
      mutate({ email, code }, {
        onSuccess: () => {
          navigate("/reset-password")
        },
        onError: (error) => {
          const message = error?.response?.data?.message || "Invalid or expired OTP"
          setFieldError("otp", message)
        },
      })
      setSubmitting(false)
    },
  })

  const handleDigitChange = (index, value) => {
    if (!/^\d?$/.test(value)) return

    const newOtp = [...formik.values.otp]
    newOtp[index] = value
    formik.setFieldValue("otp", newOtp)

    if (value && index < 4) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (formik.values.otp[index]) {
        const newOtp = [...formik.values.otp]
        newOtp[index] = ""
        formik.setFieldValue("otp", newOtp)
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text").replace(/\D/g, "")
    if (!text) return

    const digits = text.slice(0, 5).split("")
    const newOtp = ["", "", "", "", ""].map((_, idx) => digits[idx] || "")
    formik.setFieldValue("otp", newOtp)

    const nextIndex = digits.length >= 5 ? 4 : digits.length - 1
    if (nextIndex >= 0) inputsRef.current[nextIndex]?.focus()
  }

  const handleResend = async () => {
    try {
      await fetch(`${BASE_URL}/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
    } catch {
      // fail silently — UX still resets
    } finally {
      setTimeLeft(4 * 60)
      formik.resetForm()
      inputsRef.current[0]?.focus()
    }
  }

  // Derived error: check both array-level and index-level errors
  const otpError =
    formik.touched.otp &&
    (typeof formik.errors.otp === "string"
      ? formik.errors.otp
      : formik.errors.otp?.find?.(Boolean))

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-sm bg-white rounded-3xl px-6 pt-10 pb-8 border-2 border-[#A1C249]">
        <button
          type="button"
          className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mb-6"
          onClick={() => navigate(-1)}
        >
          <span className="text-lg">←</span>
        </button>

        <h1 className="text-xl font-semibold text-black text-center">
          Verify email address
        </h1>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Enter the 5 digit code sent to your email address
        </p>
        <p className="mt-1 text-xs text-gray-700 text-center font-semibold">
          {maskEmail(email)}
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-6 flex justify-between">
            {formik.values.otp.map((value, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={value}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onBlur={() => formik.setFieldTouched("otp", true)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`h-12 w-12 rounded-lg bg-gray-100 text-center text-lg font-medium outline-none border ${
                  otpError ? "border-red-400" : "border-transparent focus:border-lime-500"
                }`}
              />
            ))}
          </div>

          {otpError && (
            <p className="mt-3 text-xs text-red-500 text-center">{otpError}</p>
          )}

          <p className="mt-6 text-xs text-center text-gray-400">
            Code expires in{" "}
            <span className="font-semibold text-gray-600">
              {minutes}:{seconds}s
            </span>
          </p>

          <p className="mt-3 text-xs text-center text-gray-400">
            Didn't get code?{" "}
            <button
              type="button"
              onClick={handleResend}
              className="text-lime-500 font-medium"
            >
              Resend code
            </button>
          </p>

          <button
            type="submit"
            disabled={formik.isSubmitting || isPending}
            className="mt-10 w-full rounded-full bg-lime-500 py-3 text-sm font-semibold text-black active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting || isPending ? "Verifying..." : "Proceed"}
          </button>
        </form>
      </div>
    </div>
  )
}