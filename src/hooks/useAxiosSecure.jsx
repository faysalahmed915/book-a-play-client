import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
    // baseURL: `https://book-a-play-server.vercel.app`
})


const useAxiosSecure = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Request Interceptor: Attach Firebase ID token
        const requestInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                if (user) {
                    const token = await user.getIdToken(); // Always fetch fresh token
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response Interceptor: Handle auth errors
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;

                if (status === 403) {
                    // navigate("/forbidden");
                } else if (status === 401) {
                    try {
                        await logout();           // Log out the user from Firebase
                        navigate("/auth/login");       // Redirect to login page
                    } catch (err) {
                        console.error("Logout failed", err);
                    }
                }

                return Promise.reject(error);
            }
        );

        // Cleanup interceptors on unmount
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user, logout, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;