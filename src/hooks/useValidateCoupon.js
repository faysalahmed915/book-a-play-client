import useAxiosSecure from "./useAxiosSecure";
import { useState } from "react";

const useValidateCoupon = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const validateCoupon = async (code) => {
    if (!code.trim()) {
      return { valid: false, error: "Coupon code is empty" };
    }

    setLoading(true);
    try {
      const res = await axiosSecure.get(`/api/coupons/${code}`);
      console.log("Coupon validation response:", res.data);
      return { valid: true, data: res.data };
    } catch (err) {
      return {
        valid: false,
        error: err.response?.data?.message || "Invalid or expired coupon",
      };
    } finally {
      setLoading(false);
    }
  };

  return { validateCoupon, loading };
};

export default useValidateCoupon;
