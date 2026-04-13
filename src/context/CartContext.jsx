import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (product) => {
  // Normalize: support both _id (MongoDB) and id
  const normalizedProduct = { ...product, id: product.id || product._id };
  const exists = cart.some((p) => p.id === normalizedProduct.id);

  if (exists) {
    setCart((prev) => prev.filter((item) => item.id !== normalizedProduct.id));
    toast.info(`${normalizedProduct.name} removed from cart`);
  } else {
    setCart((prev) => [...prev, { ...normalizedProduct, quantity: 1 }]);
    toast.success(`${normalizedProduct.name} added to cart`);
  }
};

  // Update quantity (increase/decrease)
  const updateCartQuantity = (productId, action) => {
    setCart((prev) => {
      const updatedCart = prev.map((product) => {
        if (product.id === productId) {
          if (action === "increase") {
            return { ...product, quantity: product.quantity + 1 }; 
          } else if (action === "decrease" && product.quantity > 1) {
            return { ...product, quantity: product.quantity - 1 }; 
          }
        }
        return product;
      });
      return updatedCart;
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    // Ensure only one toast shows for removal
    toast.info("Product removed from cart");
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, updateCartQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
