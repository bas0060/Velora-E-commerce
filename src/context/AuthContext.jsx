// src/context/AuthContext.js
import React, { createContext, useContext } from 'react';
import { useVerifyAuth } from '@/features/auth/api/use-verify-auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Single source of truth: the cookie-verified session.
  // This query runs once on mount and is shared across the whole app.
  const { data: user, isLoading } = useVerifyAuth();

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
