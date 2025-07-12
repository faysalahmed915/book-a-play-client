// src/pages/Login.jsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const { mutateAsync: loginUser, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axios.post("/api/login", data);
            return res.data;
        },
        onSuccess: (res) => {
            console.log(res)
            Swal.fire("Success", "Login successful!", "success");
            // Optionally: Save token to localStorage, redirect, etc.
            // localStorage.setItem('token', res.token)
        },
        onError: (err) => {
            Swal.fire("Error", err.response?.data?.message || "Login failed", "error");
        },
    });

    const onSubmit = async (data) => {
        await loginUser(data);
    };

    return (
        <div className="max-w-md mx-auto p-8 shadow-xl bg-base-100 rounded">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <div>
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                    <label className="label">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum 6 characters" },
                            })}
                            className="input input-bordered w-full pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-xl"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="btn btn-secondary text-secondary-content w-full"
                >
                    {isPending ? "Logging in..." : "Login"}
                </button>
            </form>

            {/* Google Sign-in */}
            <div className="divider">or</div>
            <button className="btn btn-outline w-full">
                <img
                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                    alt="google"
                />
                Sign in with Google
            </button>
        </div>
    );
};

export default Login;
