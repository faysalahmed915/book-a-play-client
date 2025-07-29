import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/ui/Loading/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
        <p className="mb-6">You must be logged in to view this page.</p>
        {/* Optionally, add a login button or redirect link here */}
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
