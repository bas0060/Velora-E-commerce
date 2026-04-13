import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites_v1", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const toggleFavorite = (product) => {
  const normalizedProduct = { ...product, id: product.id || product._id };
  const exists = favorites.some((p) => p.id === normalizedProduct.id);

  if (exists) {
    setFavorites((s) => s.filter((p) => p.id !== normalizedProduct.id));
    toast.info(`${normalizedProduct.name} removed from favorites`);
    return { added: false };
  } else {
    setFavorites((s) => [...s, normalizedProduct]);
    toast.success(`${normalizedProduct.name} added to favorites`);
    return { added: true };
  }
};

const isFavorited = (id) => favorites.some((p) => p.id === id || p._id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorited }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
