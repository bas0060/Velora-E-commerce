import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useVerifyAuth } from '../features/auth/api/use-verify-auth';

const ProtectedRoute = () => {
  const { data: user, isLoading } = useVerifyAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        {/* Replace with your actual Spinner component */}
        <p>Loading session...</p>
      </div>
    );
  }

  // If no user, redirect to login but save the current location
  // so we can redirect them back after they log in.
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;