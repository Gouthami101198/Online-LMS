import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, activeRole } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page and remember where they came from
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // If role-restricted and current role is not authorized
  if (allowedRoles && !allowedRoles.includes(activeRole)) {
    if (activeRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (activeRole === 'instructor') {
      return <Navigate to="/instructor/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;

