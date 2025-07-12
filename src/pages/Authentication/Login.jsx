// src/pages/Login.jsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { login, googleLogin, resetPassword } = useAuth(); // ✅ use resetPassword from context

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async ({ email, password }) => {
    setIsPending(true);
    try {
      await login(email, password);
      Swal.fire("Success", "Login successful!", "success");
    } catch (error) {
      Swal.fire("Error", error.message || "Login failed", "error");
    } finally {
      setIsPending(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsPending(true);
    try {
      await googleLogin();
      Swal.fire("Success", "Google login successful!", "success");
    } catch (error) {
      Swal.fire("Error", error.message || "Google login failed", "error");
    } finally {
      setIsPending(false);
    }
  };

  const handleResetPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Reset Password",
      input: "email",
      inputLabel: "Enter your email address",
      inputPlaceholder: "you@example.com",
      showCancelButton: true,
      confirmButtonText: "Send reset email",
    });

    if (email) {
      try {
        await resetPassword(email);
        Swal.fire("Sent!", "Check your inbox to reset your password.", "success");
      } catch (error) {
        Swal.fire("Error", error.message || "Reset failed", "error");
      }
    }
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

          {/* ✅ Forgot Password Link */}
          <p className="text-sm mt-1 text-right">
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </p>
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
      <button
        onClick={handleGoogleSignIn}
        disabled={isPending}
        className="btn btn-outline w-full"
      >
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
