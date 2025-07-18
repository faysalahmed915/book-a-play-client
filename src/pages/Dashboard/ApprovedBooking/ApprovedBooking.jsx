import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApprovedBooking = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch all approved bookings for current user
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['approvedBookings', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/api/bookings?email=${user.email}&status=approved`);
      return res.data;
    },
  });

  // ✅ Mutation to delete/cancel a booking
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`/api/bookings/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Cancelled", "Booking has been cancelled.", "success");
      queryClient.invalidateQueries(['approvedBookings', user?.email]);
    },
    onError: () => {
      Swal.fire("Error", "Could not cancel booking. Try again.", "error");
    }
  });

  // 🔘 Placeholder for payment handler
  const handleMakePayment = (booking) => {
    Swal.fire("Payment", `Initiate payment of ৳${booking.price} for ${booking.courtTitle}`, "info");
    // You can redirect to a payment gateway or payment modal here
  };

  if (isLoading) return <p className="text-center mt-4">Loading approved bookings...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Approved Bookings</h2>

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
                  <td>৳ {booking.price}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleMakePayment(booking)}
                      className="btn btn-sm btn-success"
                    >
                      Make Payment
                    </button>
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
