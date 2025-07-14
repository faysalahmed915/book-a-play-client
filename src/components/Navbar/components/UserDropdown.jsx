import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import ThemeToggle from "../../ui/Theme/ThemeToggle";

const UserDropdown = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) return null;

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={user.photoURL} alt="user" />
        </div>
      </div>

      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu dropdown-content bg-base-200 rounded-box space-y-2"
      >
        <li className="text-green-600 text-center pointer-events-none">
          {user.displayName || user.email}
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
        <li>
            <ThemeToggle />
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
