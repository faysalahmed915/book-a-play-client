import { useParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import StripePayment from "./StripePayment";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePaymentWrapper = () => {
  const { id } = useParams();
  const axios = useAxiosSecure();

  const { data: yourBookingData, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const res = await axios.get(`/api/bookings/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

//   console.log("Your booking data:", yourBookingData);

  return (
    <Elements stripe={stripePromise}>
      <StripePayment booking={yourBookingData} />
    </Elements>
  );
};

export default StripePaymentWrapper;
