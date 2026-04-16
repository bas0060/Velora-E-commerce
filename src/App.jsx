import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/protected-route";
import { PageLoadingFallback } from "@/components/Loading";

const AppWrapper = lazy(() => import("./AppWrapper"));
const HomePage = lazy(() => import("./modules/home/pages/HomePage"));
const FavoritesPage = lazy(() => import("./modules/home/pages/FavoritesPage"));
const Shop = lazy(() => import("./modules/home/pages/Shop"));
const BlogsPage = lazy(() => import("./modules/home/pages/BlogsPage"));
const ContactPage = lazy(() => import("./modules/home/pages/ContactPage"));
const CartsPage = lazy(() => import("./modules/home/pages/CartsPage"));
const ProductDetailPage = lazy(() => import("./modules/home/pages/ProductDetailPage"));
const VerifyEmail = lazy(() => import("./modules/home/pages/VerifyEmail"));
const CreateAccount = lazy(() => import("./modules/home/pages/CreateAccount"));
const Login = lazy(() => import("./modules/home/pages/Login"));
const ForgotPassword = lazy(() => import("./modules/home/pages/ForgotPassword"));
const ForgotVerifyOtp = lazy(() => import("./modules/home/pages/ForgotVerifyOtp"));
const ResetPassword = lazy(() => import("./modules/home/pages/ResetPassword"));
const SignUpSuccess = lazy(() => import("./modules/home/pages/SignUpSuccess"));

const DashboardLayout = lazy(() => import("./modules/dashboard/layout/DashboardLayout"));
const ProfilePage = lazy(() => import("./modules/dashboard/pages/ProfilePage"));
const SettingsPage = lazy(() => import("./modules/dashboard/pages/SettingsPage"));
const OrdersPage = lazy(() => import("./modules/dashboard/pages/OrdersPage"));
const AddressesPage = lazy(() => import("./modules/dashboard/pages/AddressesPage"));
const AnalyticsPage = lazy(() => import("./modules/dashboard/pages/AnalyticsPage"));
const TransactionsPage = lazy(() => import("./modules/dashboard/pages/TransactionsPage"));
const OrderConfirmationPage = lazy(() => import("./modules/dashboard/pages/OrderConfirmationPage"));
const CheckoutPage = lazy(() => import("./modules/dashboard/pages/CheckoutPage"));
const OrderDetailPage = lazy(() => import("./modules/dashboard/pages/OrderDetailPage"));
const AuthLayout = lazy(() => import("./modules/home/layout/AuthLayout"));

const App = () => {
  return (
    <Suspense fallback={<PageLoadingFallback message="Loading page..." />}>
      <Routes>
        {/* ── HOME / PUBLIC SITE ── */}
        <Route element={<AppWrapper />}>
          <Route path="/" element={<HomePage />} />
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
    </Suspense>
  );
};

export default App;