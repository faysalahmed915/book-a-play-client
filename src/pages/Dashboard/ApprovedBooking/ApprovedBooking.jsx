import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router"; // use react-router not react-router-dom
import { FiTag } from "react-icons/fi"; // Discount tag icon

const ApprovedBooking = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch all approved bookings for the logged-in user
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['approvedBookings', user?.email],
    enabled: !!user?.email, // Only fetch if user email exists
    queryFn: async () => {
      const res = await axios.get(`/api/bookings?email=${user.email}&status=approved`);
      return res.data;
    },
  });

  // ✅ Mutation for cancelling a booking
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`/api/bookings/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Cancelled", "Booking has been cancelled.", "success");
      queryClient.invalidateQueries(['approvedBookings', user?.email]); // Refetch after deletion
    },
    onError: () => {
      Swal.fire("Error", "Could not cancel booking. Try again.", "error");
    }
  });

  if (isLoading) return <p className="text-center mt-4">Loading approved bookings...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Approved Bookings</h2>

      {/* Show message if no approved bookings */}
      {bookings.length === 0 ? (
        <p className="text-gray-500">You have no approved bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Court Title</th>
                <th>Date</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr key={booking._id}>
                  <td>{idx + 1}</td>
                  <td>{booking.courtTitle}</td>
                  <td>{booking.date}</td>

                  {/* ✅ Show original price with line-through and discounted price with tag */}
                  <td>
                    {booking.discountedPrice ? (
                      <div className="flex flex-col">
                        {/* Original price (cut through) */}
                        <span className="line-through text-gray-500 text-sm">৳ {booking.price}</span>
                        {/* Discounted price with tag icon */}
                        <span className="text-green-600 font-bold flex items-center gap-1">
                          <FiTag /> ৳ {booking.discountedPrice}
                        </span>
                      </div>
                    ) : (
                      <span>৳ {booking.price}</span> // No discount
                    )}
                  </td>

                  <td className="space-x-2">
                    {/* ✅ Pass correct amount to StripePay page (discounted or original) */}
                    <Link
                      to={`/dashboard/stripePay/${booking._id}?amount=${booking.discountedPrice || booking.price}`}
                    >
                      <button className="btn btn-sm btn-success">Make Payment</button>
                    </Link>

                    {/* Cancel Booking Button with Confirmation */}
                    <button
                      onClick={() =>
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You are about to cancel this booking.",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes, cancel it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            cancelMutation.mutate(booking._id);
                          }
                        })
                      }
                      className="btn btn-sm btn-error"
                    >
                      Cancel Booking
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovedBooking;
