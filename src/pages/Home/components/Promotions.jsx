import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";

export default function Promotions() {
  const axiosInstance = useAxios();

  const { data: coupons = [], isLoading, isError } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/coupons");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    onError: () => {
      Swal.fire("Error", "Failed to load promotions", "error");
    },
  });

  // Filter out expired coupons based on current date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ensure comparison is date-only

  const validCoupons = coupons.filter((coupon) => {
    if (!coupon.expiresAt) return true; // No expiry = always valid
    const expiryDate = new Date(coupon.expiresAt);
    expiryDate.setHours(0, 0, 0, 0);
    return expiryDate >= today;
  });

  if (isLoading) return <p className="text-center my-10">Loading promotions...</p>;
  if (isError || !validCoupons.length) return null;

  return (
    <section className="bg-yellow-50 py-10 px-6 rounded-lg shadow-md mb-12">
      <h2 className="text-3xl font-bold text-yellow-900 mb-6 text-center">
        Promotions & Discounts
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {validCoupons.map(({ _id, code, discount }) => (
          <div
            key={_id}
            className="bg-yellow-100 p-5 rounded-md shadow-lg w-48 text-center"
          >
            <h3 className="font-bold text-lg">{code}</h3>
            <p className="text-yellow-800">{discount}% Discount</p>
          </div>
        ))}
      </div>
    </section>
  );
}
