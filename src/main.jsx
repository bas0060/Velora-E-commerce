import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <AuthProvider>
          <CartProvider>
            <App />
            <ToastContainer position="top-center" />
          </CartProvider>
        </AuthProvider>
      </FavoritesProvider>
    </QueryClientProvider>
  </BrowserRouter>
);