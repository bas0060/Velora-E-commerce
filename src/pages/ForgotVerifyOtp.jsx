// src/pages/ForgotVerifyOtp.jsx

import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getResetEmail } from "../services/authService"

function maskEmail(email) {
  if (!email) return ""
  const [name, domain] = email.split("@")
  if (!domain) return email
  const firstChar = name[0] || ""
  return `${firstChar}${"*".repeat(Math.max(name.length - 1, 5))}@${domain}`
}

export default function ForgotVerifyOtp() {
  const navigate = useNavigate()
  const email = getResetEmail()

  const [otp, setOtp] = useState(["", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(4 * 60) // 4 minutes
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const inputsRef = useRef([])

  // countdown
  useEffect(() => {
    if (timeLeft === 0) return
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [timeLeft])

  const minutes = String(Math.floor(timeLeft / 60)).padStart(1, "0")
  const seconds = String(timeLeft % 60).padStart(2, "0")

  const handleChange = (index, value) => {
    // only digits, one char max
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // move to next input if value entered
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // clear current digit
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
      } else if (index > 0) {
        // move back when current is already empty
        inputsRef.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text").replace(/\D/g, "")
    if (!text) return

    const digits = text.slice(0, 5).split("")
    const newOtp = ["", "", "", "", ""].map(
      (_, idx) => digits[idx] || ""
    )
    setOtp(newOtp)

    const nextIndex = digits.length >= 5 ? 4 : digits.length - 1
    if (nextIndex >= 0) {
      inputsRef.current[nextIndex]?.focus()
    }
  }

  const handleSubmit = () => {
    const code = otp.join("")
    if (code.length !== 5) {
      setError("OTP must be 5 digits")
      return
    }

    // Simulated OTP validation: any 5 digits accepted
    setSuccess(true)
    navigate("/reset-password")
  }

  const handleResend = () => {
    // later: call real resend API
    setTimeLeft(4 * 60)
    setOtp(["", "", "", "", ""])
    inputsRef.current[0]?.focus()
    setError("")
    setSuccess(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm bg-white rounded-3xl px-6 pt-10 pb-8 shadow-lg">
        {/* back button */}
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

        <div className="mt-6 flex justify-between">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="h-12 w-12 rounded-lg bg-gray-100 text-center text-lg font-medium outline-none border border-transparent focus:border-lime-500"
            />
          ))}
        </div>

        {error && (
          <p className="mt-3 text-xs text-red-500 text-center">
            {error}
          </p>
        )}

        <p className="mt-6 text-xs text-center text-gray-400">
          Code expires in{" "}
          <span className="font-semibold text-gray-600">
            {minutes}:{seconds}s
          </span>
        </p>

        <p className="mt-3 text-xs text-center text-gray-400">
          Didn’t get code?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-lime-500 font-medium"
          >
            Resend code
          </button>
        </p>

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-10 w-full rounded-full bg-lime-500 py-3 text-sm font-semibold text-black active:scale-[0.99]"
        >
          Proceed
        </button>

        {success && (
          <p className="mt-4 text-xs text-center text-green-600">
            OTP validated. Proceeding to reset password.
          </p>
        )}
      </div>
    </div>
  )
}
