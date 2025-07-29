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
import PendingBookings from "../pages/Dashboard/PendingBooking/PendingBooking.jsx";
import ManageBookings from "../pages/Dashboard/ManageBookings/ManageBookings.jsx";
import ApprovedBooking from "../pages/Dashboard/ApprovedBooking/ApprovedBooking.jsx";
import StripePaymentWrapper from "../components/Shared/PaymentPages/Stripe/StripePaymentWrapper .jsx";
import ConfirmedCourts from "../pages/Dashboard/ConfirmedBooking/ConfirmedCourts.jsx";
import ManageMembers from "../pages/Dashboard/ManageMembers/ManageMembers.jsx";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory.jsx";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement/MakeAnnouncement.jsx";
import Announcements from "../pages/Dashboard/Announcements/Announcements.jsx";
import ManageCoupons from "../pages/Dashboard/ManageCoupons/ManageCoupons.jsx";
import PrivateRoute from "../routes/PrivateRoute.jsx";
import MemberRoute from "../routes/MemberRoute.jsx";
import AdminRoute from "../routes/AdminRoute.jsx";
import ErrorPage from "../routes/ErrorPage.jsx";


export const Router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        errorElement: <ErrorPage></ErrorPage>,
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
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        errorElement: <ErrorPage />,
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
                element: <MemberRoute><ApprovedBooking /></MemberRoute>,
            },
            {
                path: 'confirmedBookings',
                element: <MemberRoute><ConfirmedCourts /></MemberRoute>,
            },
            // {
            // path: 'payment',
            // element: <h1>payment</h1>,
            // },
            {
                path: 'paymentHistory',
                element: <MemberRoute><PaymentHistory /></MemberRoute>,
            },
            {
                path: 'manageBookings',
                element: <AdminRoute><ManageBookings /></AdminRoute>,
            },
            {
                path: 'manageMembers',
                element: <AdminRoute><ManageMembers /></AdminRoute>,
            },
            {
                path: 'allUsers',
                element: <AdminRoute><AllUsers /></AdminRoute>,
            },
            {
                path: 'manageCourts',
                element: <AdminRoute><ManageCourts /></AdminRoute>,
            },
            {
                path: 'manageBookings',
                element: <h1>manage Bookings</h1>,
            },
            {
                path: 'manageCoupons',
                element: <AdminRoute><ManageCoupons /></AdminRoute>,
            },
            {
                path: 'makeAnnouncement',
                element: <AdminRoute><MakeAnnouncement /></AdminRoute>,
            },
            {
                path: 'addCourt',
                element: <AdminRoute><AddCourtForm /></AdminRoute>,
            },
            {
                path: 'stripePay/:id',
                element: <StripePaymentWrapper />,
            },

        ]
    }
])
