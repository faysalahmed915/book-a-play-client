import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import Courts from "../pages/Courts/Courts/Courts.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import About from "../pages/About/About.jsx";
import Home from "../pages/Home/Home/Home.jsx";


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
                path: '/blogs',
                // Component: Blogs,
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
    }
])
