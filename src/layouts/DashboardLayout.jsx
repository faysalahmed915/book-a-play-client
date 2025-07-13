import { NavLink, Outlet } from 'react-router';
import {
  FiHome, FiUsers, FiSettings, FiLogOut, FiBookOpen,
  FiUserCheck, FiUser, FiUserPlus
} from 'react-icons/fi';
import ThemeToggle from '../components/ui/Theme/ThemeToggle';

const DashboardLayout = () => {
  const Links = (
    <>
      <li><NavLink to="/dashboard" className="gap-2"><FiHome />Dashboard</NavLink></li>
      <li><NavLink to="/dashboard/profile" className="gap-2"><FiUser />My Profile</NavLink></li>
      <li><NavLink to="/dashboard/become-member" className="gap-2"><FiUserPlus />Become a Member</NavLink></li>
      <li><NavLink to="/dashboard/activities" className="gap-2"><FiBookOpen />Member Activities</NavLink></li>
      <li><NavLink to="/dashboard/manage-users" className="gap-2"><FiUsers />Manage Users</NavLink></li>
      <li><NavLink to="/dashboard/manage-bookings" className="gap-2"><FiUserCheck />Manage Bookings</NavLink></li>
      <li><NavLink to="/dashboard/settings" className="gap-2"><FiSettings />Admin Settings</NavLink></li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page content */}
      <div className="drawer-content flex flex-col p-4 bg-base-200 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          {/* Toggle button for mobile */}
          <label htmlFor="dashboard-drawer" className="btn btn-outline lg:hidden">
            ☰
          </label>
          {/* <div className='lg:hidden'><ThemeToggle /></div> */}
        </div>

        <Outlet />
      </div>

      {/* Sidebar menu */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content">
          <div className='flex items-center justify-between'>
            <h2 className="text-xl font-bold mb-4">BookAPlay</h2>
          <ThemeToggle></ThemeToggle>
          </div>
          {Links}
          <li className="mt-auto pt-6 border-t">
            <NavLink to="/" className="gap-2"><FiLogOut />Back to Home</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
