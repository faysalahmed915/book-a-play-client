// src/pages/Login.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

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
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setIsPending(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      Swal.fire("Success", "Logged in with Google!", "success");
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 shadow-xl bg-base-100 rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-3 right-3 text-xl"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <p className="text-sm mt-1 text-right">
            <Link to="/auth/resetPassword" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </p>
        </div>

        <button type="submit" className="btn btn-secondary w-full" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="divider">or</div>
      <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
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
