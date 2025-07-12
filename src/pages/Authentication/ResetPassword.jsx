// src/pages/ResetPassword.jsx

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../firebase/firebase.config"; // adjust path if needed

const auth = getAuth(app);

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire(
        "Email Sent",
        "Check your inbox for a password reset link.",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", error.message || "Reset failed", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 shadow-xl bg-base-100 rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

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

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
