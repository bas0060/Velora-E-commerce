import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AppWrapper from "./AppWrapper";
import HomePage from "./modules/home/pages/HomePage";
import FavoritesPage from "./modules/home/pages/FavoritesPage";
import Shop from "./modules/home/pages/Shop";
import BlogsPage from "./modules/home/pages/BlogsPage";
import ContactPage from "./modules/home/pages/ContactPage";
import CartsPage from "./modules/home/pages/CartsPage";
import ProductDetailPage from "./modules/home/pages/ProductDetailPage";
import VerifyEmail from "./modules/home/pages/VerifyEmail";
import CreateAccount from "./modules/home/pages/CreateAccount";
import Login from "./modules/home/pages/Login";
import ForgotPassword from "./modules/home/pages/ForgotPassword";
import ForgotVerifyOtp from "./modules/home/pages/ForgotVerifyOtp";
import ResetPassword from "./modules/home/pages/ResetPassword";
import ProtectedRoute from "./routes/protected-route";
import AuthLayout from "./modules/home/layout/AuthLayout";

// Dashboard
import DashboardLayout from "./modules/dashboard/layout/DashboardLayout";
import ProfilePage from "./modules/dashboard/pages/ProfilePage";
import SettingsPage from "./modules/dashboard/pages/SettingsPage";
import OrdersPage from "./modules/dashboard/pages/OrdersPage";
import AddressesPage from "./modules/dashboard/pages/AddressesPage";
import AnalyticsPage from "./modules/dashboard/pages/AnalyticsPage";
import TransactionsPage from "./modules/dashboard/pages/TransactionsPage";
import OrderConfirmationPage from "./modules/dashboard/pages/OrderConfirmationPage";
import CheckoutPage from "./modules/dashboard/pages/CheckoutPage";
import OrderDetailPage from "./modules/dashboard/pages/OrderDetailPage";
import SignUpSuccess from "./modules/home/pages/SignUpSuccess";

const HomeOrCreateAccount = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading session...</p>
      </div>
    );
  }

  return user ? <HomePage /> : <Navigate to="/create-account" replace />;
};

const App = () => {
  return (
    <Routes>
      {/* ── HOME / PUBLIC SITE ── */}
      <Route element={<AppWrapper />}>

        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/carts" element={<CartsPage />} />

        {/* --- AUTH REDIRECT LANDING --- */}
        <Route path="/" element={<HomeOrCreateAccount />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/carts" element={<CartsPage />} />

        {/* --- PROTECTED --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Route>

      {/* ── AUTH PAGES ── */}
      <Route element={<AuthLayout />}>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account/success" element={<SignUpSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/verify" element={<ForgotVerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* ── DASHBOARD ── */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OrdersPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:orderId" element={<OrderDetailPage />} />
          <Route path="orders/confirmation" element={<OrderConfirmationPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="addresses" element={<AddressesPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;