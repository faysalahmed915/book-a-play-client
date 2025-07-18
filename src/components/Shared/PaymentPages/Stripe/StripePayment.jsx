import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const StripePayment = ({ booking }) => {

// console.log("Booking data:", booking);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axios = useAxiosSecure();

  const price = booking.price;
  const {
    _id,
    courtImage,
    courtTitle,
    date,
    slots,
    userEmail,
    status,
  } = booking;

  // Step 1: Fetch clientSecret
  const {
    data: clientSecretData,
    isLoading: clientSecretLoading,
    isError: clientSecretError,
  } = useQuery({
    queryKey: ["clientSecret", _id],
    queryFn: async () => {
      const res = await axios.post("/api/payment/create-payment-intent", { price });
      return res.data;
    },
    enabled: price > 0,
  });

  const clientSecret = clientSecretData?.clientSecret;

  // Step 2: Handle Stripe payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (cardError) {
      setError(cardError.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: paymentMethod.id }
    );

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setSuccess("✅ Payment successful!");

      await axios.post("/api/payments", {
        bookingId: _id,
        transactionId: paymentIntent.id,
        email: userEmail,
        amount: price,
      });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <div className="mb-6">
        <img
          src={courtImage}
          alt={courtTitle}
          className="w-full h-56 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-semibold">{courtTitle}</h2>
        <p className="text-gray-600">📅 Date: {new Date(date).toDateString()}</p>
        <p className="text-gray-600">🕓 Slots Booked: {slots.length}</p>
        <p className="text-gray-600">📧 User: {userEmail}</p>
        <p className="text-gray-600">💳 Amount: ৳{price}</p>
        <p className="text-gray-600">✅ Status: {status}</p>
      </div>

      <div className="border-t pt-4">
        {clientSecretLoading && <p className="text-gray-500">Initializing payment...</p>}
        {clientSecretError && (
          <p className="text-red-500">Failed to load payment details. Please try again.</p>
        )}

        {!clientSecretLoading && clientSecret && (
          <form onSubmit={handleSubmit}>
            <CardElement className="border p-4 rounded mb-4" />
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={!stripe || !clientSecret}
            >
              Pay ৳{price}
            </button>
          </form>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default StripePayment;
