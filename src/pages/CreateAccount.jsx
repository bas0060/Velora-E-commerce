// src/pages/CreateAccount.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signUpWithEmail,
  signInWithProvider,
  requestOtp,
} from "../services/authService";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CreateAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const handleCreateAccount = async () => {
    if (!emailRegex.test(email.trim())) {
      setError("invalid mail, try again");
      return;
    }
    if (!agree) {
      setError("Please agree to the Terms and conditions");
      return;
    }

    setError("");

    await signUpWithEmail(email.trim());
    await requestOtp(email.trim());
    navigate("/verify-email");
  };

  const handleProviderClick = async (provider) => {
    setError("");
    const res = await signInWithProvider(provider);
    if (res.ok) {
      await requestOtp(res.email);
      navigate("/verify-email");
    }
  };

  const inputBaseClasses =
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors";
  const inputNormal = "border-gray-300 focus:border-lime-500";
  const inputError = "border-red-500 focus:border-red-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm bg-white rounded-3xl px-6 pt-10 pb-8 shadow-lg">
        <h1 className="text-xl font-semibold text-black text-center">
          Create an account
        </h1>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Enter your personal details below to create an account now.
        </p>

        <div className="mt-8 space-y-2">
          <label className="text-xs text-gray-500">Email address</label>
          <input
            type="email"
            className={`${inputBaseClasses} ${
              error ? inputError : inputNormal
            }`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="Topsysammy@yahoo.com"
          />
          {error && (
            <p className="flex items-center gap-1 text-xs text-red-500">
              <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
              {error === "invalid mail, try again"
                ? "invalid mail, try again"
                : error}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-start gap-2">
          <button
            type="button"
            onClick={() => setAgree((prev) => !prev)}
            className={`mt-0.5 h-5 w-5 rounded border flex items-center justify-center ${
              agree ? "border-lime-500 bg-lime-500" : "border-gray-300"
            }`}
          >
            {agree && (
              <span className="h-2 w-2 bg-white rounded-sm block" />
            )}
          </button>
          <p className="text-[11px] leading-4 text-gray-500">
            By checking the box, you are agreeing to the{" "}
            <span className="underline">Terms and conditions</span>
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateAccount}
          className="mt-6 w-full rounded-full bg-lime-500 py-3 text-sm font-semibold text-black active:scale-[0.99]"
        >
          Create account
        </button>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">Or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="mt-4 space-y-3">
          <button
            type="button"
            onClick={() => handleProviderClick("apple")}
            className="w-full flex items-center justify-center gap-2 rounded-full border border-lime-400 py-3 text-sm font-medium text-gray-800"
          >
            <span className="text-lg"></span>
            <span>Continue with apple</span>
          </button>

          <button
            type="button"
            onClick={() => handleProviderClick("google")}
            className="w-full flex items-center justify-center gap-2 rounded-full border border-lime-400 py-3 text-sm font-medium text-gray-800"
          >
            <span className="text-lg">G</span>
            <span>Continue with google</span>
          </button>
        </div>

        <p className="mt-8 text-xs text-center text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-lime-500 font-medium"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
