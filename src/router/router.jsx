import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import About from "../pages/About/About.jsx";
import Home from "../pages/Home/Home/Home.jsx";
import Faq from "../pages/Faq/Faq.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Login from "../pages/Authentication/Login.jsx";
import Register from "../pages/Authentication/Register.jsx";
import ResetPassword from "../pages/Authentication/ResetPassword.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Courts from "../pages/Court/Courts.jsx";
import Dashboard from "../pages/Dashboard/HomeDashboard/Dashboard.jsx";
import Profile from "../pages/Dashboard/Profile/Profile.jsx";
import ManageCourts from "../pages/Dashboard/ManageCourt/ManageCourts.jsx";
import AddCourtForm from "../pages/Dashboard/ManageCourt/components/AddCourtForm.jsx";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers.jsx";
import { Pen } from "lucide-react";
import PendingBookings from "../pages/Dashboard/PendingBooking/PendingBooking.jsx";
import ManageBookings from "../pages/Dashboard/ManageBookings/ManageBookings.jsx";
import ApprovedBooking from "../pages/Dashboard/ApprovedBooking/ApprovedBooking.jsx";
import StripePaymentWrapper from "../components/Shared/PaymentPages/Stripe/StripePaymentWrapper .jsx";
import ConfirmedCourts from "../pages/Dashboard/ConfirmedBooking/ConfirmedCourts.jsx";
import ManageMembers from "../pages/Dashboard/ManageMembers/ManageMembers.jsx";
import PaymentHistory from "../pages/Dashboard/ManageMembers/PaymentHistory.jsx";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement/MakeAnnouncement.jsx";
import Announcements from "../pages/Dashboard/Announcements/Announcements.jsx";


export const Router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        // errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                path: '/',
                Component: Home,
                // loader: async () => {
                //     const res = await fetch('https://bd-food-storage-server.vercel.app/fridge');
                //     return res.json();
                // },
                // hydrateFallbackElement: <h1>Loading...</h1>,
            },
            {
                path: '/about',
                Component: About,
            },
            {
                path: '/courts',
                Component: Courts,
            },
            {
                path: '/projects',
                // Component: Projects,
            },
            {
                path: '/faq',
                Component: Faq,
            },
            {
                path: "/projectDetails/:id",
                // Component: ProjectDetails,
            },
            {
                path: "/contact",
                Component: Contact,
            }

        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'register',
                Component: Register,
            },
            {
                path: 'resetPassword',
                Component: ResetPassword,

            }
        ]
    },
    {
        path: '/dashboard',
        Component: DashboardLayout,
        children: [
            {
                index: true,
                Component: Profile,
            },
            // {
            //     path: 'profile',
            //     Component: Profile,
            // },
            {
                path: 'pendingBookings',
                element: <PendingBookings />,
            },
            {
                path: 'announcements',
                element: <Announcements />,
            },
            {
                path: 'approvedBookings',
                element: <ApprovedBooking />,
            },
            {
                path: 'confirmedBookings',
                element: <ConfirmedCourts />,
            },
            {
                path: 'payment',
                element: <h1>payment</h1>, 
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory />,
            },
            {
                path: 'manageBookings',
                element: <ManageBookings />,
            },
            {
                path: 'manageMembers',
                element: <ManageMembers />,
            },
            {
                path: 'allUsers',
                element: <AllUsers />,
            },
            {
                path: 'manageCourts',
                element: <ManageCourts />,
            },
            {
                path: 'manageBookings',
                element: <h1>manage Bookings</h1>,
            },
            {
                path: 'manageCoupons',
                element: <h1>manage Coupons</h1>,
            },
            {
                path: 'makeAnnouncement',
                element: <MakeAnnouncement />,
            },
            {
                path: 'addCourt',
                element: <AddCourtForm />,
            },
            {
                path: 'stripePay/:id',
                element: <StripePaymentWrapper />,
            },
            
        ]
    }
])
