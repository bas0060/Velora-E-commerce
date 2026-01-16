// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail, signInWithProvider } from "../services/authService";
import { useAuth } from "../context/AuthContext"; // ⬅️ make sure this exists

// Regex for email and password validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ⬅️ comes from AuthContext

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const baseInput =
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors bg-[#F8F8F8]";
  const normalBorder = "border-gray-300 focus:border-lime-500";
  const errorBorder = "border-red-500 focus:border-red-500";

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let ok = true;

    if (!emailRegex.test(email.trim())) {
      newErrors.email = "Invalid email, try again";
      ok = false;
    }

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters, including a mix of upper & lower case, numbers, and special characters.";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    const res = await loginWithEmail(email.trim(), password);

    if (!res.ok) {
      setErrors((prev) => ({
        ...prev,
        password: res.error || "Incorrect email or password.",
      }));
      return;
    }

    if (res.user && typeof login === "function") {
      // put full user (with fullName, phone, etc.) into AuthContext
      login(res.user);
    }

    navigate("/"); // HomePage
  };

  const handleProviderClick = async (provider) => {
    setErrors({ email: "", password: "" });
    const res = await signInWithProvider(provider);
    if (res.ok) {
      // later: you can also set auth context here once provider flow returns user
      navigate("/"); // HomePage
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm bg-white rounded-3xl px-6 pt-10 pb-8 shadow-lg">
        <h1 className="text-xl font-semibold text-black text-center">Login</h1>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Enter your personal details below to proceed
        </p>

        {/* Email */}
        <div className="mt-8 space-y-2">
          <label className="text-xs text-gray-500">Email</label>
          <input
            type="email"
            className={`${baseInput} ${
              errors.email ? errorBorder : normalBorder
            }`}
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
          />
          {errors.email && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mt-4 space-y-2">
          <label className="text-xs text-gray-500">Password</label>
          <div
            className={`flex items-center rounded-xl border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } bg-[#F8F8F8] px-3`}
          >
            <input
              type={showPassword ? "text" : "password"}
              className="flex-1 bg-transparent py-3 text-sm outline-none"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: "" }));
                }
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
          {errors.password && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Forget password */}
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/forget-password")}
            className="text-xs font-medium text-black"
          >
            Forgot password
          </button>
        </div>

        {/* Login button */}
        <button
          type="button"
          onClick={handleLogin}
          className="mt-6 w-full rounded-full bg-lime-500 py-3 text-sm font-semibold text-black active:scale-[0.99]"
        >
          Login
        </button>

        {/* Sign up link */}
        <p className="mt-4 text-xs text-center text-gray-400">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-lime-500 font-medium"
          >
            Sign up
          </button>
        </p>

        {/* Separator */}
        <div className="mt-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">Or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Social login */}
        <div className="mt-4 space-y-3">
          <button
            type="button"
            onClick={() => handleProviderClick("apple")}
            className="w-full flex items-center justify-center gap-2 rounded-full border border-gray-300 py-3 text-sm font-medium text-gray-800 bg-white"
          >
            <span className="text-lg"></span>
            <span>Continue with Apple</span>
          </button>

          <button
            type="button"
            onClick={() => handleProviderClick("google")}
            className="w-full flex items-center justify-center gap-2 rounded-full border border-gray-300 py-3 text-sm font-medium text-gray-800 bg-white"
          >
            <span className="text-lg">G</span>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
