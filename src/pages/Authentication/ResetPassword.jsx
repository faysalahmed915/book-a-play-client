// src/pages/ResetPassword.jsx
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async ({ email }) => {
    try {
      await resetPassword(email);
      Swal.fire("Success", "Reset email sent!", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 shadow-xl bg-base-100 rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <p className="text-sm mt-1 text-right">
            <Link to="/auth/login" className="text-blue-600 hover:underline">
              Go Back
            </Link>
          </p>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Send Reset Email
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
