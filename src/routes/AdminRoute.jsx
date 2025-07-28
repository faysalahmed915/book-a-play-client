// src/routes/AdminRoute.jsx
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import LoadingSpinner from "../components/ui/Loading/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAdmin, isLoading } = useUserRole();
  const location = useLocation();

  if (loading || isLoading) return <LoadingSpinner />;

  if (!user || !isAdmin) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
