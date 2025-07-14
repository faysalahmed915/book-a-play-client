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
                Component: Dashboard,
            },
            {
                path: 'profile',
                Component: Profile,
            },
            {
                path: 'pendingBookings',
                element: <h1>Pending Bookings</h1>, // Placeholder for PendingBookings component
            },
            {
                path: 'announcements',
                element: <h1>announcements</h1>, // Placeholder for PendingBookings component
            },
            {
                path: 'approvedBookings',
                element: <h1>approvedBookings</h1>, // Placeholder for PendingBookings component
            },
            {
                path: 'confirmedBookings',
                element: <h1>confirmedBookings</h1>, // Placeholder for PendingBookings component
            },
            {
                path: 'payment',
                element: <h1>payment</h1>, // Placeholder for PendingBookings component
            },
            {
                path: 'paymentHistory',
                element: <h1>payment History</h1>, // Placeholder for PendingBookings component
            },
        ]
    }
])
