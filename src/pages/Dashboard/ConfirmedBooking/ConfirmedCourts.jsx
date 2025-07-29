import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const ConfirmedCourts = () => {
  const { user } = useAuth(); // Get logged-in user info
  const axios = useAxiosSecure(); // Axios instance with secure config (e.g., JWT)
  const [selectedBooking, setSelectedBooking] = useState(null); // For modal view

  // Fetch confirmed bookings for the logged-in user
  const { data: confirmedBookings = [], isLoading } = useQuery({
    queryKey: ["confirmedBookings", user?.email],
    enabled: !!user?.email, // Run query only if user email is available
    queryFn: async () => {
      const res = await axios.get("/api/bookings", {
        params: {
          email: user?.email,
          status: "confirmed", // Only confirmed bookings
        },
      });
      return res.data;
    },
  });

  return (
    <div className="p-4 md:p-8">
      {/* SEO title */}
      <Helmet>
        <title>Confirmed Courts | Book A Play</title>
      </Helmet>

      {/* Page heading */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-primary">
        Confirmed Courts
      </h2>

      {/* Loading spinner */}
      {isLoading ? (
        <div className="text-center py-10">
          <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
      ) : confirmedBookings.length === 0 ? (
        /* No confirmed bookings message */
        <p className="text-center text-gray-500">No confirmed bookings found.</p>
      ) : (
        /* Table showing confirmed bookings */
        <div className="overflow-x-auto rounded-xl shadow-lg bg-base-300">
          <table className="table table-zebra w-full text-sm md:text-base">
            <thead className="bg-secondary text-secondary-content">
              <tr>
                <th>#</th>
                <th>Court</th>
                <th>Date</th>
                <th>Slots</th>
                <th>Price (৳)</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {confirmedBookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.courtTitle}</td>
                  <td>{new Date(booking.date).toDateString()}</td>
                  <td>
                    {/* List all booked slots */}
                    {booking.slots.map((slot, i) => (
                      <span key={i} className="block">
                        ⏱ {slot.start} - {slot.end}
                      </span>
                    ))}
                  </td>
                  <td className="text-green-600 font-semibold">
                    {/* Show discount if available and less than original price */}
                    {booking.discountedPrice && booking.discountedPrice < booking.price ? (
                      <>
                        {/* Original price struck through */}
                        <span className="line-through text-gray-500 mr-2">৳{booking.price}</span>
                        {/* Discounted price */}
                        <span>৳{booking.discountedPrice}</span>
                        {/* Discount amount */}
                        <span className="ml-2 text-sm text-success">
                          ({booking.price - booking.discountedPrice}৳ off)
                        </span>
                      </>
                    ) : (
                      /* No discount: show normal price */
                      <>৳{booking.price}</>
                    )}
                  </td>
                  <td>
                    {/* Button to open booking details modal */}
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Booking details modal */}
      {selectedBooking && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100">
            {/* Close button */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setSelectedBooking(null)}
              aria-label="Close booking details"
            >
              ✕
            </button>

            {/* Booking title */}
            <h3 className="text-lg font-bold mb-3">
              Booking Details for {selectedBooking.courtTitle}
            </h3>

            {/* Court image */}
            <img
              src={selectedBooking.courtImage}
              alt={`Court - ${selectedBooking.courtTitle}`}
              className="w-full h-40 object-cover rounded mb-4"
            />

            {/* Booking date */}
            <p><strong>Date:</strong> {new Date(selectedBooking.date).toDateString()}</p>

            {/* Booked slots */}
            <p className="mt-2"><strong>Slots:</strong></p>
            <ul className="list-disc list-inside mb-3 text-sm">
              {selectedBooking.slots.map((slot, idx) => (
                <li key={idx}>
                  {slot.start} - {slot.end}
                </li>
              ))}
            </ul>

            {/* Price with discount info */}
            <p>
              <strong>Price:</strong>{" "}
              {selectedBooking.discountedPrice && selectedBooking.discountedPrice < selectedBooking.price ? (
                <>
                  <span className="line-through text-gray-500 mr-2">৳{selectedBooking.price}</span>
                  <span className="text-green-600 font-semibold">৳{selectedBooking.discountedPrice}</span>
                  <span className="ml-2 text-sm text-success">
                    ({selectedBooking.price - selectedBooking.discountedPrice}৳ off)
                  </span>
                </>
              ) : (
                <>৳{selectedBooking.price}</>
              )}
            </p>

            {/* Transaction ID */}
            <p><strong>Transaction ID:</strong> {selectedBooking.transactionId || "N/A"}</p>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ConfirmedCourts;
