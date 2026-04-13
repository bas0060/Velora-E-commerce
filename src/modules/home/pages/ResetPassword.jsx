import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useResetPassword } from "@/features/auth/api/use-reset-password"
import { toast } from "react-toastify" // import react-toastify for the toast message

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

export default function ResetPassword() {
  const navigate = useNavigate()
  const { mutate, isPending } = useResetPassword()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const validate = () => {
    if (!passwordRegex.test(password)) {
      setError("Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character.")
      return false
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!validate()) return

    const email = localStorage.getItem("resetEmail")
    mutate({ email, password }, {
      onSuccess: () => {
        localStorage.removeItem("resetEmail")
        setSuccess(true)
        toast.success("Password reset successful. You can now log in.")
        navigate("/login")
      },
      onError: (error) => {
        setError(error?.response?.data?.message || "Error updating password.")
      },
    })
  }

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-sm bg-white rounded-3xl px-6 pt-10 pb-8 shadow-lg">
        <h1 className="text-xl font-semibold text-black text-center">Reset Password</h1>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Enter new password below to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {/* New password */}
          <div className="space-y-2">
            <label className="text-xs text-gray-500">New password</label>
            <div
              className={`flex items-center rounded-xl border ${
                error ? "border-red-500" : "border-gray-300"
              } bg-[#F8F8F8] px-3`}
            >
              <input
                type={showPassword ? "text" : "password"}
                className="flex-1 bg-transparent py-3 text-sm outline-none"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) setError("") // Clear error when user starts typing
                }}
              />
              {password.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="ml-2 h-6 w-6 flex items-center justify-center text-gray-500"
                >
                  {showPassword ? "👁" : "🙈"}
                </button>
              )}
            </div>
          </div>

          {/* Confirm password */}
          <div className="space-y-2">
            <label className="text-xs text-gray-500">Confirm password</label>
            <div
              className={`flex items-center rounded-xl border ${
                error ? "border-red-500" : "border-gray-300"
              } bg-[#F8F8F8] px-3`}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="flex-1 bg-transparent py-3 text-sm outline-none"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (error) setError("") // Clear error when user starts typing
                }}
              />
              {confirmPassword.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="ml-2 h-6 w-6 flex items-center justify-center text-gray-500"
                >
                  {showConfirmPassword ? "👁" : "🙈"}
                </button>
              )}
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-lime-500 py-3 text-sm font-semibold text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {success && (
          <p className="mt-4 text-xs text-center text-green-600">
            Password updated successfully. You can now log in.
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
