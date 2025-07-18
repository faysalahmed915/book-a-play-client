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
    <div className="p-6">
      <Helmet>
        <title>Confirmed Courts | Book A Play</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center">✅ Confirmed Courts</h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading confirmed bookings...</p>
      ) : confirmedBookings.length === 0 ? (
        <p className="text-center text-gray-500">No confirmed bookings found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table w-full table-zebra">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th>#</th>
                <th>Court</th>
                <th>Date</th>
                <th>Slots</th>
                <th>Price (৳)</th>
                <th>Email</th>
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
                  <td>{booking.price}</td>
                  <td>{booking.userEmail}</td>
                  <td>
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setSelectedBooking(null)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-2">
              Booking Details for {selectedBooking.courtTitle}
            </h3>
            <img
              src={selectedBooking.courtImage}
              alt="Court"
              className="w-full h-40 object-cover rounded mb-3"
            />
            <p><strong>Date:</strong> {new Date(selectedBooking.date).toDateString()}</p>
            <p><strong>Slots:</strong></p>
            <ul className="list-disc list-inside mb-2">
              {selectedBooking.slots.map((slot, idx) => (
                <li key={idx}>
                  {slot.start} - {slot.end}
                </li>
              ))}
            </ul>
            <p><strong>Price:</strong> ৳{selectedBooking.price}</p>
            <p><strong>Transaction ID:</strong> {selectedBooking.transactionId}</p>
            <p><strong>Email:</strong> {selectedBooking.userEmail}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmedCourts;
