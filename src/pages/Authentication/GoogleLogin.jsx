import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import { useMutation } from '@tanstack/react-query';

const GoogleLogin = () => {

    const { googleLogin } = useAuth();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    const axiosInstance = useAxios();

    const { mutateAsync: saveGoogleUser, isPending } = useMutation({
        mutationFn: async (userInfo) => {
            const res = await axiosInstance.post("/api/users", userInfo);
            return res.data;
        },
        onError: () => {
            Swal.fire("Error", "Failed to save user info to backend", "error");
        },
    });

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleLogin();
            const user = result.user;
            console.log("Google user:", user);
            // Prepare user info
            const userInfo = {
                name: user.displayName || "Anonymous",
                email: user.email,
                photo: user.photoURL || "",
            };

            await saveGoogleUser(userInfo); // ✅ uses TanStack mutation
            // Swal.fire("Success", "Logged in with Google!", "success");
            navigate(from, { replace: true });
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
            <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="google"
            />
            {isPending ? "Signing in..." : "Sign in with Google"}
        </button>
    );
};

export default GoogleLogin;