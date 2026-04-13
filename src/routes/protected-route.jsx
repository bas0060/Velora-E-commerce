// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader } from 'lucide-react';

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth(); // reuses the already-running query — no extra fetch
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        {/* Technical Spinner for Loading */}
        <div className="flex justify-center items-center">
          <Loader className="w-16 h-16 text-[#A1C249] animate-spin" />
        </div>
      </div>
    );
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/create-account" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
