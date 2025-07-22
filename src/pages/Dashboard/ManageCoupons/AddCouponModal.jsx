import Swal from "sweetalert2";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddCouponModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    expiresAt: "",
  });

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newCoupon) => {
      const res = await axiosSecure.post("/api/coupons", newCoupon);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Coupon Added",
        text: "New coupon added successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["coupons"]);
      onClose();
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text:
          error?.response?.data?.message ||
          "Failed to add coupon. Please try again.",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      code: formData.code,
      discount: parseFloat(formData.discount),
      expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[95%] max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">➕ Add New Coupon</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Coupon Code"
            value={formData.code}
            onChange={(e) =>
              setFormData({ ...formData, code: e.target.value })
            }
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            placeholder="Discount (%)"
            value={formData.discount}
            onChange={(e) =>
              setFormData({ ...formData, discount: e.target.value })
            }
            className="input input-bordered w-full"
            required
            min={1}
            max={100}
          />
          <input
            type="date"
            placeholder="Expiry Date"
            value={formData.expiresAt}
            onChange={(e) =>
              setFormData({ ...formData, expiresAt: e.target.value })
            }
            className="input input-bordered w-full"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-sm"
              onClick={onClose}
              disabled={mutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Adding..." : "Add Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCouponModal;
