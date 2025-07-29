import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import LoadingSpinner from "../components/ui/Loading/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAdmin, isLoading } = useUserRole();

  if (loading || isLoading) return <LoadingSpinner />;

  if (!user || !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
        <p className="mb-6">You do not have permission to view this page.</p>
        {/* Optional: Add a button to go back or contact support */}
      </div>
    );
  }

  return children;
};

export default AdminRoute;
