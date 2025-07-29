import LoadingSpinner from "../components/ui/Loading/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const MemberRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isMember, isLoading } = useUserRole();

  if (loading || isLoading) return <LoadingSpinner />;

  if (!user || !isMember) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
        <p className="mb-6">You do not have permission to view this page.</p>
        {/* Optionally add a "Go Back" button or contact info here */}
      </div>
    );
  }

  return children;
};

export default MemberRoute;
