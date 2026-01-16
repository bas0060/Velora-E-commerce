// src/services/authService.js

// In future, replace these with real HTTP calls / OAuth flows.
const EMAIL_KEY = "velora_pending_email";
const USER_KEY = "velora_user";
const RESET_EMAIL_KEY = "velora_reset_email";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export function savePendingEmail(email) {
  localStorage.setItem(EMAIL_KEY, email);
}

export function getPendingEmail() {
  return localStorage.getItem(EMAIL_KEY) || "";
}

export function clearPendingEmail() {
  localStorage.removeItem(EMAIL_KEY);
}

// Simulate email signup API
export async function signUpWithEmail(email) {
  // Here you would POST to /auth/signup
  savePendingEmail(email);
  return { ok: true };
}

// Base function to plug Google / Apple flows into
export async function signInWithProvider(provider) {
  // Later:
  // if (provider === "google") { startGoogleOAuth(); }
  // if (provider === "apple") { startAppleOAuth(); }

  // Temporary mock for development only
  const mockEmail =
    provider === "google"
      ? "topsysammy@gmail.com"
      : "topsysammy@icloud.com";

  savePendingEmail(mockEmail);
  return { ok: true, email: mockEmail };
}

// Simulate sending OTP
export async function requestOtp(email) {
  // real: POST /auth/send-otp
  // For now, just pretend we sent it
  return { ok: true };
}

// Simulate verifying OTP
export async function verifyOtp(email, code) {
  // For now accept only 12345 as valid
  const isValid = code === "12345";
  // NOTE: do NOT clear pending email here anymore.
  return { ok: isValid };
}

// NEW: final sign-up step
export async function completeSignUp(userData) {
  // later: POST to /auth/signup-final

  // attach the email we captured in the earlier step
  const emailFromStorage = getPendingEmail();
  const finalUser = {
    ...userData,
    email: userData.email || emailFromStorage || "",
  };

  localStorage.setItem(USER_KEY, JSON.stringify(finalUser));
  clearPendingEmail(); // clean up once signup is done

  return { ok: true, user: finalUser };
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function findUserByEmail(email) {
  const user = getStoredUser();
  if (user && user.email === email) return user;
  return null;
}

export async function loginWithEmail(email, password) {
  // later: POST /auth/login

  const user = findUserByEmail(email);
  if (!user) {
    return { ok: false, error: "Account not found. Please create an account." };
  }

  if (user.password !== password) {
    return { ok: false, error: "Incorrect password. Try again." };
  }

  // optional: keep last login info
  localStorage.setItem(
    "velora_last_login",
    JSON.stringify({ email, at: new Date().toISOString() })
  );

  return { ok: true, user };
}

// Password validation
export function validatePassword(password) {
  return passwordRegex.test(password);
}

export function setResetEmail(email) {
  localStorage.setItem(RESET_EMAIL_KEY, email);
}

export function getResetEmail() {
  return localStorage.getItem(RESET_EMAIL_KEY) || "";
}

export function clearResetEmail() {
  localStorage.removeItem(RESET_EMAIL_KEY);
}

export async function updatePassword(email, newPassword) {
  const user = getStoredUser();
  if (!user || user.email !== email) {
    return { ok: false, error: "User not found." };
  }

  const updatedUser = { ...user, password: newPassword };
  localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  return { ok: true, user: updatedUser };
}
