import { useRouteError, Link } from "react-router";
import { Home } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-center p-6">
      <h1 className="text-5xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg mb-2">Something went wrong.</p>
      <p className="text-sm text-gray-500 mb-6">
        {error.statusText || error.message}
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
}
