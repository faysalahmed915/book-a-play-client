import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation, Link } from "react-router";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth"; // ✅ important fix
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import GoogleLogin from "./GoogleLogin";

const image_hosting_key = "254e30c78a0322d21cd206c94379ef7e";
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { createFirebaseUser, loading } = useAuth();

  const { register, handleSubmit, watch, formState: { errors }, } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { mutateAsync: saveUserToBackend, isPending } = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosSecure.post("/api/users", userData);
      return res.data;
    },
    onError: () => {
      Swal.fire("Error", "User saved in Firebase but failed in server", "error");
    },
  });

  const onSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      return Swal.fire("Error", "Passwords do not match", "error");
    }

    try {
      const imageFile = new FormData();
      imageFile.append("image", formData.photo[0]);

      const res = await fetch(image_hosting_url, {
        method: "POST",
        body: imageFile,
      });

      const imgData = await res.json();
      const photoURL = imgData?.data?.display_url;

      if (!photoURL) {
        return Swal.fire("Error", "Image upload failed", "error");
      }

      const userCredential = await createFirebaseUser(formData.email, formData.password);

      // ✅ Update Firebase user profile
      await updateProfile(userCredential.user, {
        displayName: formData.name,
        photoURL: photoURL,
      });

      // ✅ Navigate to previous page first
      navigate(from, { replace: true });

      // ✅ Then silently send user data to backend
      const userData = {
        name: formData.name,
        email: formData.email,
        photo: photoURL,
      };

      await saveUserToBackend(userData);
    } catch (err) {
      console.error("Registration failed:", err);
      Swal.fire("Error", "Something went wrong during registration", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 shadow-xl bg-base-100 rounded-2xl">
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
          disabled={loading || isPending}
          className="btn btn-secondary text-secondary-content w-full"
        >
          {(loading || isPending) ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="divider">or</div>
      
      {/* Social Signin */}
      <div>
              <GoogleLogin />
      </div>

      {/* Login Redirect */}
      <div className="text-center mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>

    </div>
  );
};

export default Register;
