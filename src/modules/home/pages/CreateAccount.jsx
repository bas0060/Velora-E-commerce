import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegister } from "@/features/auth/api/use-register.js";
import { useGetProducts } from "../api/use-get-products";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePassword(pw) {
  const lengthOk = pw.length >= 8;
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasDigit = /\d/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  return lengthOk && hasUpper && hasLower && hasDigit && hasSpecial;
}

export default function CreateAccount() {
  const { mutate, isPending } = useRegister();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerToastTimer = useRef(null);

  // `error` is for general / top-level error (email, API, terms)
  const [error, setError] = useState("");

  const { data } = useGetProducts();
  console.log("Products data:", data); // Debugging log

  const [errors, setErrors] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const inputBaseClasses =
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors";
  const inputNormal = "border-gray-300 focus:border-lime-500";
  const inputError = "border-red-500 focus:border-red-500";

  useEffect(() => {
    return () => {
      if (registerToastTimer.current) {
        clearTimeout(registerToastTimer.current);
      }
    };
  }, []);

  const handleCreateAccount = () => {
    // reset field-level errors
    if (registerToastTimer.current) {
      clearTimeout(registerToastTimer.current);
    }

    const newErrors = {
      userName: "",
      password: "",
      confirmPassword: "",
    };
    let ok = true;

    // username validation
    if (!userName.trim()) {
      newErrors.userName = "Username is required";
      ok = false;
    }

    // email format validation
    if (!emailRegex.test(email.trim())) {
      setError("Invalid email format, please try again.");
      ok = false;
    } else if (!agree) {
      setError("Please agree to the Terms and conditions");
      ok = false;
    } else {
      setError("");
    }

    // password validation
    if (!password) {
      newErrors.password = "Password is required";
      ok = false;
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
      ok = false;
    }

    // confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      ok = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
      ok = false;
    }

    setErrors(newErrors);

    if (!ok) return;

    // Prepare the payload for backend
    const payload = {
      username: userName.trim(),
      email: email.trim(),
      password,
    };

    console.log("Sending payload to API:", payload);  // Debugging log

    registerToastTimer.current = window.setTimeout(() => {
      toast.info(
        "Your account has been created. You can click login and use the email and password.",
        { autoClose: 4000 }
      );
    }, 12000);

    // Call the backend API
    mutate(payload, {
      onSuccess: () => {
        if (registerToastTimer.current) {
          clearTimeout(registerToastTimer.current);
          registerToastTimer.current = null;
        }
        navigate("/verify-email", { state: { email: email.trim() } });
      },
      onError: (err) => {
        if (registerToastTimer.current) {
          clearTimeout(registerToastTimer.current);
          registerToastTimer.current = null;
        }
        console.log("Register error:", err);
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          (typeof err?.response?.data === "string"
            ? err.response.data
            : "") ||
          `Request failed with status ${err?.response?.status || ""}` ||
          err?.message ||
          "Failed to create account";
        setError(msg);  // Display error to the user
      },
    });
  };

  const handleProviderClick = async (provider) => {
    setError("");
    const res = await signInWithProvider(provider);
    if (res.ok) {
      await requestOtp(res.email);
      navigate("/verify-email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-y-auto">
      <div className="w-full max-w-120 bg-white lg:rounded-3xl px-6 py-6 border-2 border-[#A1C249]">
        <h1 className="text-xl font-semibold text-black text-center">
          Create an account
        </h1>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Enter your personal details below to create an account now.
        </p>

        {/* USERNAME */}
        <div className="mt-2 space-y-2">
          <label className="text-xs text-gray-500">User name</label>
          <input
            type="text"
            className={`${inputBaseClasses} ${
              errors.userName ? inputError : inputNormal
            }`}
            placeholder="User name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              if (errors.userName) {
                setErrors((prev) => ({ ...prev, userName: "" }));
              }
            }}
          />
          {errors.userName && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              {errors.userName}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className="mt-2 space-y-2">
          <label className="text-xs text-gray-500">Email address</label>
          <input
            type="email"
            className={`${inputBaseClasses} ${
              error && error.startsWith("Invalid email")
                ? inputError
                : inputNormal
            }`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="example@email.com"
          />
          {error && (
            <p className="flex items-center gap-1 text-xs text-red-500">
              <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
              {error}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mt-2 space-y-2">
          <label className="text-xs text-gray-500">Create password</label>
          <div
            className={`flex items-center rounded-xl border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } bg-[#F8F8F8] px-3`}
          >
            <input
              type={showPassword ? "text" : "password"}
              className="flex-1 bg-transparent py-3 text-sm outline-none"
              placeholder="Enter preferred password"
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

        {/* CONFIRM PASSWORD */}
        <div className="mt-2 space-y-2">
          <label className="text-xs text-gray-500">Confirm password</label>
          <div
            className={`flex items-center rounded-xl border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } bg-[#F8F8F8] px-3`}
          >
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="flex-1 bg-transparent py-3 text-sm outline-none"
              placeholder="Enter preferred password again"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) {
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }
              }}
            />
            {confirmPassword.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                className="ml-2 h-6 w-6 flex items-center justify-center text-gray-500"
              >
                {showConfirmPassword ? "👁" : "🙈"}
              </button>
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* TERMS */}
        <div className="mt-4 flex items-start gap-2">
          <button
            type="button"
            onClick={() => setAgree((prev) => !prev)}
            className={`mt-0.5 h-5 w-5 rounded border flex items-center justify-center ${
              agree ? "border-[#A1C249] bg-[#A1C249]" : "border-gray-300"
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

        {/* SUBMIT */}
        <button
          type="button"
          onClick={handleCreateAccount}
          disabled={isPending}
          className="mt-4 w-full rounded-full bg-[#A1C249] py-3 text-sm font-semibold text-black active:scale-[0.99] disabled:opacity-60"
        >
          {isPending ? "Creating account..." : "Create account"}
        </button>

        {/* PROVIDERS */}
        <div className="mt-4 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">Or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="mt-4 space-y-3">        
          <button
            type="button"
            onClick={() => handleProviderClick("google")}
            className="w-full flex items-center justify-center gap-2 rounded-full border border-[#A1C249] py-3 text-sm font-medium text-gray-800"
          >
            <span className="text-lg">G</span>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* LOGIN LINK */}
        <p className="mt-4 text-xs text-center text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#A1C249] font-medium"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
