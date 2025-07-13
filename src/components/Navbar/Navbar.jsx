import { Link, NavLink } from 'react-router';
import Logo from '../Shared/Logo/Logo';
import ThemeToggle from '../ui/Theme/ThemeToggle';
// import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import UserDropdown from './components/UserDropdown';

const Navbar = () => {

    const { user } = useAuth();
    // const navigate = useNavigate();

    // const handleLogout = async () => {
    //     try {
    //         await logout();
    //         Swal.fire("Logged out", "You have been logged out", "success");
    //         navigate("/"); // optional: go to home
    //     } catch (err) {
    //         Swal.fire("Error", err.message || "Logout failed", "error");
    //     }
    // };

    const links = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "text-base-content font-bold" : "font-bold"
                }
            >
                Home
            </NavLink>

            {/* {user && (
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "text-base-content font-bold" : "font-bold"
                    }
                >
                    Dashboard
                </NavLink>
            )} */}


            <NavLink
                to="/courts"
                className={({ isActive }) =>
                    isActive ? "text-base-content font-bold" : "font-bold"
                }
            >
                Courts
            </NavLink>

            <NavLink
                to="/about"
                className={({ isActive }) =>
                    isActive ? "text-base-content font-bold" : "font-bold"
                }
            >
                About
            </NavLink>

            <NavLink
                to="/contact"
                className={({ isActive }) =>
                    isActive ? "text-base-content font-bold" : "font-bold"
                }
            >
                Contact
            </NavLink>

            <NavLink
                to="/faq"
                className={({ isActive }) =>
                    isActive ? "text-base-content font-bold" : "font-bold"
                }
            >
                FAQ
            </NavLink>
        </>

    );


    return (
        <div className="bg-base-300 shadow-md px-2 md:px-4 lg:px-8 py-2 sticky top-0 z-50">
            <div className="navbar max-w-7xl mx-auto px-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-base-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 shadow-lg bg-base-200 rounded-lg w-52 text-gray-500 space-y-1 z-50"
                        >
                            {links}
                        </ul>
                    </div>

                    <div className='w-24 hidden lg:flex items-center'>
                        <Logo></Logo>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-5 text-gray-500 font-medium">
                        {links}
                    </ul>
                </div>


                <div className="navbar-end gap-3">
                    {!user ? (
                        <>
                            <Link to="/auth/login" className="btn btn-outline btn-sm">
                                Login
                            </Link>
                            <Link to="/auth/register" className="btn btn-secondary btn-sm text-secondary-content">
                                Register
                            </Link>
                        </>
                    ) : <UserDropdown />}


                    <ThemeToggle />
                </div>

            </div>
        </div>


    );
};

export default Navbar;