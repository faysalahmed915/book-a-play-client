import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import { Fade } from "react-awesome-reveal";

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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validCoupons = coupons.filter((coupon) => {
    if (!coupon.expiresAt) return true;
    const expiryDate = new Date(coupon.expiresAt);
    expiryDate.setHours(0, 0, 0, 0);
    return expiryDate >= today;
  });

  if (isLoading)
    return (
      <p className="text-center my-10 text-yellow-700 font-semibold">
        Loading promotions...
      </p>
    );
  if (isError) return null;
  if (!validCoupons.length)
    return (
      <p className="text-center my-10 text-yellow-700 font-semibold">
        No active promotions currently. Check back soon!
      </p>
    );

  return (
    <Fade triggerOnce cascade damping={0.1}>
      <section
        className="bg-yellow-50 py-16 px-4 md:px-20 rounded-lg shadow-lg mb-16 max-w-7xl mx-auto"
        aria-label="Promotions and Discounts"
      >
        <h2 className="text-3xl font-extrabold text-yellow-900 mb-8 text-center drop-shadow-md">
          Promotions & Discounts
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {validCoupons.map(({ _id, code, discount, description }) => (
            <div
              key={_id}
              className="bg-yellow-100 p-6 rounded-lg shadow-md w-48 text-center transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-2"
              tabIndex={0}
              role="button"
              aria-label={`Coupon code ${code} for ${discount}% discount`}
            >
              <h3 className="font-bold text-xl mb-2 tracking-wide text-yellow-800">
                {code}
              </h3>
              <p className="text-yellow-900 font-semibold text-lg mb-1">
                {discount}% Off
              </p>
              {description && (
                <p className="text-yellow-700 text-sm">{description}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </Fade>
  );
}
