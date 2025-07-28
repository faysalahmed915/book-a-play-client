// src/routes/MemberRoute.jsx
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../components/ui/Loading/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const MemberRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isMember, isLoading } = useUserRole();
  const location = useLocation();

  if (loading || isLoading) return <LoadingSpinner />;

  if (!user || !isMember) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

export default MemberRoute;
