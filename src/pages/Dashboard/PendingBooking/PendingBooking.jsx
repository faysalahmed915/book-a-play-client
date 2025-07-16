import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FiClock, FiCalendar, FiDollarSign, FiTrash } from 'react-icons/fi';
import LoadingSpinner from '../../../components/ui/Loading/LoadingSpinner';
import NoData from '../../../components/Shared/NoData/NoData';
import PendingBookingCard from './components/PendingBookingCard';

const PendingBookings = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch bookings with error handling
  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['pending-bookings', user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/bookings?email=${user.email}&status=pending`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Cancel Booking mutation
  const cancelBookingMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`/api/bookings/${id}`);
    },
    onSuccess: () => {
      Swal.fire('Cancelled', 'Booking has been cancelled.', 'success');
      queryClient.invalidateQueries(['pending-bookings', user?.email]);
      queryClient.invalidateQueries(['admin-bookings']);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to cancel booking. Try again!', 'error');
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This booking will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBookingMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Pending Bookings</h2>

      {/* ✅ Show error if fetch fails */}
      {isError && (
        <p className="text-red-500">Failed to load bookings: {error.message}</p>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : bookings.length === 0 ? (
        <NoData message="No pending bookings found." />
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <PendingBookingCard booking={booking} cancelBookingMutation={cancelBookingMutation} handleCancel={handleCancel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingBookings;
