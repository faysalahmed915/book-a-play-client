// src/pages/Register.jsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";

const image_hosting_key = "254e30c78a0322d21cd206c94379ef7e";
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { mutateAsync: registerUser, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axios.post("/api/register", data);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Success", "Registered successfully!", "success");
        },
        onError: () => {
            Swal.fire("Error", "Registration failed", "error");
        },
    });

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            return Swal.fire("Error", "Passwords do not match", "error");
        }

        try {
            const imageFile = new FormData();
            imageFile.append("image", data.photo[0]);

            const res = await axios.post(image_hosting_url, imageFile, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const photoURL = res.data?.data?.display_url;

            const userData = {
                name: data.name,
                email: data.email,
                password: data.password,
                photo: photoURL,
            };

            await registerUser(userData);
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Image upload or registration failed", "error");
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 shadow-xl bg-base-100 rounded">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="label">Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

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

                {/* Photo */}
                <div>
                    <label className="label">Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("photo", { required: "Photo is required" })}
                        className="file-input file-input-bordered w-full"
                    />
                    {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
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

                {/* Confirm Password */}
                <div>
                    <label className="label">Confirm Password</label>
                    <div className="relative">
                        <input
                            type={showConfirm ? "text" : "password"}
                            {...register("confirmPassword", { required: "Please confirm password" })}
                            className="input input-bordered w-full pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-xl"
                            onClick={() => setShowConfirm((prev) => !prev)}
                        >
                            {showConfirm ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                    )}
                    {!errors.confirmPassword &&
                        password &&
                        confirmPassword &&
                        password !== confirmPassword && (
                            <p className="text-red-500 text-sm">Passwords do not match</p>
                        )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="btn btn-secondary text-secondary-content w-full"
                >
                    {isPending ? "Registering..." : "Register"}
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

export default Register;
