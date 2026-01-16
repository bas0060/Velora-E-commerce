// src/pages/ForgotPassword.jsx

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { findUserByEmail, setResetEmail } from "../services/authService"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgotPassword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const trimmed = email.trim()

    if (!emailRegex.test(trimmed)) {
      setError("Invalid email, try again")
      return
    }

    const user = findUserByEmail(trimmed)
    if (!user) {
      setError("No account found with this email")
      return
    }

    setResetEmail(trimmed)
    setSuccess("Email found. You can now reset your password.")
    navigate("/forgot-password/verify")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm bg-white rounded-3xl px-6 pt-10 pb-8 shadow-lg">
        <h1 className="text-xl font-semibold text-black text-center">Forget Password</h1>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Enter your email address below to proceed.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <label className="text-xs text-gray-500">Email address</label>
            <input
              type="email"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors bg-[#F8F8F8] border-gray-300 focus:border-lime-500`}
              placeholder="Enter email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError("")
              }}
            />
            {error && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-lime-500 py-3 text-sm font-semibold text-black active:scale-[0.99]"
          >
            Proceed
          </button>
        </form>

        {success && (
          <p className="mt-4 text-xs text-center text-green-600">
            {success}
          </p>
        )}

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
