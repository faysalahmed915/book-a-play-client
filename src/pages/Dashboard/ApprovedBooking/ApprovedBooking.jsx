import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router"; // ✅ react-router used instead of react-router-dom
import { FiTag } from "react-icons/fi"; // Discount tag icon
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

const ApprovedBooking = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Fetch all approved bookings for the logged-in user
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['approvedBookings', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/api/bookings?email=${user.email}&status=approved`);
      return res.data;
    },
  });

  // ✅ Mutation for cancelling a booking
  const cancelMutation = useMutation({
    mutationFn: async (id) => await axios.delete(`/api/bookings/${id}`),
    onSuccess: () => {
      Swal.fire("Cancelled", "Booking has been cancelled.", "success");
      queryClient.invalidateQueries(['approvedBookings', user?.email]);
    },
    onError: () => {
      Swal.fire("Error", "Could not cancel booking. Try again.", "error");
    }
  });

  // ✅ Calculate pagination values
  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isLoading) return <p className="text-center mt-4">Loading approved bookings...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Approved Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">You have no approved bookings yet.</p>
      ) : (
        <>
          {/* ✅ Booking table */}
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
                {paginatedBookings.map((booking, idx) => (
                  <tr key={booking._id}>
                    <td>{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                    <td>{booking.courtTitle}</td>
                    <td>{booking.date}</td>
                    <td>
                      {booking.discountedPrice ? (
                        <div className="flex flex-col">
                          <span className="line-through text-gray-500 text-sm">
                            ৳ {booking.price}
                          </span>
                          <span className="text-green-600 font-bold flex items-center gap-1">
                            <FiTag /> ৳ {booking.discountedPrice}
                          </span>
                        </div>
                      ) : (
                        <span>৳ {booking.price}</span>
                      )}
                    </td>
                    <td className="space-x-2">
                      <Link
                        to={`/dashboard/stripePay/${booking._id}?amount=${booking.discountedPrice || booking.price}`}
                      >
                        <button className="btn btn-sm btn-success">Make Payment</button>
                      </Link>
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

          {/* ✅ Pagination Controls */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ApprovedBooking;
