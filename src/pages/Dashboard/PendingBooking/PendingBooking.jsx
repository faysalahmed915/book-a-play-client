import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useState } from 'react';
import LoadingSpinner from '../../../components/ui/Loading/LoadingSpinner';
import NoData from '../../../components/Shared/NoData/NoData';
import PendingBookingCard from './components/PendingBookingCard';

const ITEMS_PER_PAGE = 6; // ➕ Show 6 bookings per page

const PendingBookings = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1); // ➕ Current pagination page

  // ✅ Fetch user's pending bookings
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

  // ✅ Cancel booking mutation
  const cancelBookingMutation = useMutation({
    mutationFn: async (id) => await axios.delete(`/api/bookings/${id}`),
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

  // 🔢 Pagination calculations
  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Pending Bookings</h2>

      {isError && (
        <p className="text-red-500 text-center">❌ Failed to load bookings: {error.message}</p>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : bookings.length === 0 ? (
        <NoData message="No pending bookings found." />
      ) : (
        <>
          {/* 🔽 Booking Cards */}
          <div className="grid gap-4">
            {paginatedBookings.map((booking) => (
              <PendingBookingCard
                key={booking._id}
                booking={booking}
                cancelBookingMutation={cancelBookingMutation}
                handleCancel={handleCancel}
              />
            ))}
          </div>

          {/* 🔽 Pagination Buttons */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PendingBookings;
