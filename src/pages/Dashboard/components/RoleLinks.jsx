import { NavLink } from "react-router";
import {
    FiHome,
    FiUser,
    FiCalendar,
    FiBookOpen,
    FiBell,
    FiDollarSign,
    FiCheckCircle,
    FiClipboard,
    FiUsers,
    FiSettings,
    FiCreditCard,
    FiPlusCircle,
    FiTrash2,
    FiSearch,
    FiMessageCircle,
} from "react-icons/fi";
import useUserRole from "../../../hooks/useUserRole";

const RoleLinks = () => {

    const { isAdmin, isMember, isUser, isLoading, isError } = useUserRole();
    
    if (isLoading) return <p>Loading links...</p>;
    if (isError) return <p>Error loading links</p>;

    // User Dashboard Links
    if (isUser) {
        return (
            <>
                <li>
                    <NavLink to="/dashboard" className="gap-2">
                        <FiHome />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/profile" className="gap-2">
                        <FiUser />
                        My Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/pendingBookings" className="gap-2">
                        <FiCalendar />
                        Pending Bookings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/announcements" className="gap-2">
                        <FiBell />
                        Announcements
                    </NavLink>
                </li>
            </>
        );
    }

    // Member Dashboard Links
    if (isMember) {
        return (
            <>
                <li>
                    <NavLink to="/dashboard" className="gap-2">
                        <FiHome />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/profile" className="gap-2">
                        <FiUser />
                        My Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/pendingBookings" className="gap-2">
                        <FiCalendar />
                        Pending Bookings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/approvedBookings" className="gap-2">
                        <FiCheckCircle />
                        Approved Bookings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/confirmedBookings" className="gap-2">
                        <FiClipboard />
                        Confirmed Bookings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/payment" className="gap-2">
                        <FiDollarSign />
                        Payment Page
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/paymentHistory" className="gap-2">
                        <FiCreditCard />
                        Payment History
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/announcements" className="gap-2">
                        <FiBell />
                        Announcements
                    </NavLink>
                </li>
            </>
        );
    }

    // Admin Dashboard Links
    if (isAdmin) {
        return (
            <>
                <li>
                    <NavLink to="/dashboard" className="gap-2">
                        <FiHome />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/profile" className="gap-2">
                        <FiUser />
                        Admin Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/manageBookings" className="gap-2">
                        <FiCheckCircle />
                        Manage Bookings Approval
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/manageMembers" className="gap-2">
                        <FiUsers />
                        Manage Members
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/allUsers" className="gap-2">
                        <FiUser />
                        All Users
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/manageCourts" className="gap-2">
                        <FiSettings />
                        Manage Courts
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/manageBookings" className="gap-2">
                        <FiClipboard />
                        Manage Bookings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/manageCoupons" className="gap-2">
                        <FiPlusCircle />
                        Manage Coupons
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/makeAnnouncement" className="gap-2">
                        <FiMessageCircle />
                        Make Announcement
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/announcements" className="gap-2">
                        <FiBell />
                        Announcements
                    </NavLink>
                </li>
            </>
        );
    }

    // If no role matched
    return null;
};

export default RoleLinks;
