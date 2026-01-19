import React from 'react'
import { Routes, Route } from "react-router-dom";
import AppWrapper from './AppWrapper';
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import Shop from './pages/Shop';
import BlogsPage from './pages/BlogsPage';
import ContactPage from './pages/ContactPage';
import CartsPage from './pages/CartsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SignUp from './pages/SignUp';
import VerifyEmail from './pages/VerifyEmail';
import CreateAccount from './pages/CreateAccount';
import SignUpSuccess from './pages/SignUpSuccess';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ForgotVerifyOtp from './pages/ForgotVerifyOtp';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './routes/protected-route';


const App = () => {
  return (
    <Routes>
      <Route element={<AppWrapper />}>
        {/* <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-success" element={<SignUpSuccess />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/verify" element={<ForgotVerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/carts" element={<CartsPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} /> */}

        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />

        {/* --- AUTH ROUTES (Only for logged out users) --- */}
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/verify-email' element={<VerifyEmail />} />

        {/* --- PROTECTED ROUTES (Logged in only) --- */}
        <Route element={<ProtectedRoute />}>
           {/* Future routes like /profile or /transaction-history go here */}
        </Route>
        

      </Route>
    </Routes>
  )
}

export default App
