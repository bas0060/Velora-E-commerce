// src/pages/SignUp.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { completeSignUp } from "../services/authService";

function validatePassword(pw) {
  const lengthOk = pw.length >= 8;
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasDigit = /\d/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  return lengthOk && hasUpper && hasLower && hasDigit && hasSpecial;
}

export default function SignUp() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phoneValue, setPhoneValue] = useState("234"); // library keeps value without +
  const [phoneCountry, setPhoneCountry] = useState("ng");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

const handlePhoneChange = (value, country) => {
  // value from react-phone-input-2 is digits only, no "+"
  let digits = (value || "").replace(/\D/g, "");

  const iso2 = country?.countryCode || phoneCountry || "ng";
  const dialCode = country?.dialCode || (iso2 === "ng" ? "234" : "");

  if (iso2 === "ng") {
    // Make sure we always start with 234
    if (!digits.startsWith(dialCode)) {
      digits = dialCode + digits.replace(/^234/, "");
    }

    // national part after 234
    const national = digits.slice(dialCode.length, dialCode.length + 10);
    digits = dialCode + national; // 234 + up to 10 digits
  }

  setPhoneCountry(iso2);
  setPhoneValue(digits);
  setErrors((prev) => ({ ...prev, phone: "" }));
};



//   const handlePhoneChange = (value, country) => {
//     const countryCode = country?.dialCode || "";
//     const iso2 = country?.countryCode || "ng";

//     let next = value;

//     // make sure prefix stays
//     if (!next.startsWith(countryCode)) {
//       next = countryCode + next.replace(new RegExp("^" + countryCode), "");
//     }

//     // for Nigeria, allow 10 digits after 234
//     if (iso2 === "ng") {
//       const national = next.slice(countryCode.length);
//       if (national.length > 10) {
//         next = countryCode + national.slice(0, 10);
//       }
//     }

//     setPhoneCountry(iso2);
//     setPhoneValue(next);
//     setErrors((prev) => ({ ...prev, phone: "" }));
//   };

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };
    let ok = true;

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
      ok = false;
    }

    // basic phone validation
    const digitsOnly = phoneValue.replace(/\D/g, "");
    if (!digitsOnly) {
      newErrors.phone = "Phone number is required";
      ok = false;
    } else {
      // rough length check, library will do better once API is wired
      if (phoneCountry === "ng" && digitsOnly.length !== 13) {
        // 234 + 10 digits = 13
        newErrors.phone = "Enter a valid Nigerian phone number";
        ok = false;
      } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        newErrors.phone = "Enter a valid phone number";
        ok = false;
      }
    }

    if (!password) {
      newErrors.password = "Password must be at least 8 characters";
      ok = false;
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character";
      ok = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      ok = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const userData = {
      fullName: fullName.trim(),
      phone: "+" + phoneValue, // store with +
      country: phoneCountry,
      password: password,
    };

    const res = await completeSignUp(userData);
    if (res.ok) {
      navigate("/signup-success");
    }
  };

  const baseInput =
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors bg-[#F8F8F8]";
  const normalBorder = "border-gray-300 focus:border-lime-500";
  const errorBorder = "border-red-500 focus:border-red-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm bg-white rounded-3xl px-6 pt-10 pb-8 shadow-lg">
        <button
          type="button"
          className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mb-6"
          onClick={() => navigate(-1)}
        >
          <span className="text-lg">←</span>
        </button>

        <h1 className="text-xl font-semibold text-black">
          Create your velora account
        </h1>
        <p className="mt-1 text-xs text-gray-500">
          Start saving abd tracking your crew.
        </p>

        {/* Full name */}
        <div className="mt-6 space-y-2">
          <label className="text-xs text-gray-500">Full name</label>
          <input
            type="text"
            className={`${baseInput} ${
              errors.fullName ? errorBorder : normalBorder
            }`}
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) {
                setErrors((prev) => ({ ...prev, fullName: "" }));
              }
            }}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Phone number */}
        <div className="mt-4 space-y-2">
            <label className="text-xs text-gray-500">Phone number</label>
            <div
                className={`rounded-xl border ${
                errors.phone ? "border-red-500" : "border-gray-300"
                } bg-[#F8F8F8]`}
            >
                <PhoneInput
                country={"ng"}
                value={phoneValue.replace(/^\+/, "")}
                onChange={handlePhoneChange}
                containerClass="w-full"
                inputClass="!w-full !bg-[#F8F8F8] !border-none !shadow-none !py-3 !h-12 text-sm"
                buttonClass="!border-none !bg-transparent"
                dropdownClass="react-phone-dropdown"
                specialLabel={""}
                countryCodeEditable={false}
                inputProps={{
                    name: "phone",
                    required: true,
                    maxLength: phoneCountry === "ng" ? 17 : 19,
                }}
                />
            </div>
            {errors.phone && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                {errors.phone}
                </p>
            )}
        </div>

        {/* <div className="mt-4 space-y-2">
          <label className="text-xs text-gray-500">Phone number</label>
          <div
            className={`rounded-xl border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } bg-[#F8F8F8]`}
          >
            <PhoneInput
              country={"ng"}
              value={phoneValue.replace(/^\+/, "")}
              onChange={handlePhoneChange}
              containerClass="w-full react-phone-container"
              inputClass="w-full !bg-[#F8F8F8] !border-none !shadow-none text-sm"
              buttonClass="react-phone-flag-button"
              dropdownClass="react-phone-dropdown"
              specialLabel={""}
              countryCodeEditable={false}
              inputProps={{
                name: "phone",
                required: true,
                maxLength: phoneCountry === "ng" ? 17 : 19,
              }}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              {errors.phone}
            </p>
          )}
        </div> */}

        {/* Password */}
        <div className="mt-4 space-y-2">
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

        {/* <div className="mt-4 space-y-2">
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
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-2 h-6 w-6 flex items-center justify-center text-gray-500"
            >
              {showPassword ? "👁" : "🙈"}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              {errors.password}
            </p>
          )}
        </div> */}

        {/* Confirm password */}
        <div className="mt-4 space-y-2">
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
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
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

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-8 w-full rounded-full bg-lime-500 py-3 text-sm font-semibold text-black active:scale-[0.99]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
