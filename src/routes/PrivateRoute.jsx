// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/ui/Loading/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
