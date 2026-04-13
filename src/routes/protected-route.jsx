// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth(); // reuses the already-running query — no extra fetch
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading session...</p>
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
