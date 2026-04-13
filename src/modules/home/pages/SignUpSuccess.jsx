// src/pages/SignupSuccess.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm bg-white rounded-3xl px-6 pt-24 pb-12 shadow-lg text-center">
        <button
        type="button"
        className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mb-6"
        onClick={() => navigate(-1)}
      >
        <span className="text-lg">←</span>
      </button>
        <div className="mx-auto mb-6 h-3 w-3 rounded-full bg-lime-500" />

        <h1 className="text-lg font-semibold text-black">
          Account created successfully!
        </h1>

        <p className="mt-3 text-xs text-gray-500">
          You have successfully created a new account, click below to proceed to
          the Homepage
        </p>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-10 w-full rounded-full bg-lime-500 py-3 text-sm font-semibold text-black active:scale-[0.99]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
