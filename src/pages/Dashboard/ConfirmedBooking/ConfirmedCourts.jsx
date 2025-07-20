import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const ConfirmedCourts = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data: confirmedBookings = [], isLoading } = useQuery({
    queryKey: ["confirmedBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get("/api/bookings", {
        params: {
          email: user?.email,
          status: "confirmed",
        },
      });
      return res.data;
    },
  });

  return (
    <div className="p-4 md:p-8">
      <Helmet>
        <title>Confirmed Courts | Book A Play</title>
      </Helmet>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-primary">
        Confirmed Courts
      </h2>

      {isLoading ? (
        <div className="text-center py-10">
          <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
      ) : confirmedBookings.length === 0 ? (
        <p className="text-center text-gray-500">No confirmed bookings found.</p>
      ) : (
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
                    {booking.slots.map((slot, i) => (
                      <span key={i} className="block">
                        ⏱ {slot.start} - {slot.end}
                      </span>
                    ))}
                  </td>
                  <td className="text-green-600 font-semibold">{booking.price}/-</td>
                  <td>
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

      {/* MODAL */}
      {selectedBooking && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setSelectedBooking(null)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-3">
              Booking Details for {selectedBooking.courtTitle}
            </h3>
            <img
              src={selectedBooking.courtImage}
              alt="Court"
              className="w-full h-40 object-cover rounded mb-4"
            />
            <p><strong>Date:</strong> {new Date(selectedBooking.date).toDateString()}</p>
            <p className="mt-2"><strong>Slots:</strong></p>
            <ul className="list-disc list-inside mb-3 text-sm">
              {selectedBooking.slots.map((slot, idx) => (
                <li key={idx}>
                  {slot.start} - {slot.end}
                </li>
              ))}
            </ul>
            <p><strong>Price:</strong> ৳{selectedBooking.price}</p>
            <p><strong>Transaction ID:</strong> {selectedBooking.transactionId}</p>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ConfirmedCourts;
