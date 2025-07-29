import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiClock, FiCalendar, FiDollarSign, FiCheck, FiX, FiTag } from 'react-icons/fi';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/ui/Loading/LoadingSpinner';
import NoData from '../../../components/Shared/NoData/NoData';
import { useState } from 'react';

const ManageBookings = () => {
    const axios = useAxiosSecure();
    const queryClient = useQueryClient();

    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 6;

    // Fetch bookings
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['admin-bookings'],
        queryFn: async () => {
            const res = await axios.get('/api/bookings?status=pending');
            return res.data;
        }
    });

    // Approve / Reject booking
    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            return await axios.patch(`/api/bookings/${id}`, { status });
        },
        onSuccess: (_, { status }) => {
            Swal.fire('Success', `Booking ${status}`, 'success');
            queryClient.invalidateQueries(['admin-bookings']);
        },
        onError: () => {
            Swal.fire('Error', 'Failed to update booking.', 'error');
        }
    });

    const handleAction = (id, status) => {
        updateStatusMutation.mutate({ id, status });
    };

    // Pagination logic
    const totalPages = Math.ceil(bookings.length / bookingsPerPage);
    const startIndex = (currentPage - 1) * bookingsPerPage;
    const paginatedBookings = bookings.slice(startIndex, startIndex + bookingsPerPage);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Manage Booking Requests</h2>

            {isLoading ? (
                <LoadingSpinner />
            ) : bookings.length === 0 ? (
                <NoData message="No pending bookings found." />
            ) : (
                <>
                    <div className="grid gap-4">
                        {paginatedBookings.map((booking) => (
                            <div key={booking._id} className="border rounded-lg p-4 bg-base-300 shadow">
                                <div className='flex gap-4 flex-wrap-reverse justify-center sm:justify-between items-center'>
                                    <div>
                                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                                            <div>
                                                <h3 className="text-xl font-semibold">{booking.courtTitle}</h3>
                                                <p>Booked by: <span className='text-green-600'>{booking.userEmail}</span></p>
                                            </div>
                                        </div>

                                        <div className="text-sm space-y-1 mt-2">
                                            <div className="flex items-center gap-2">
                                                <FiCalendar /> <span>Applied on:</span> <strong>{booking.date}</strong>
                                            </div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <FiClock />
                                                <span>Slots:</span>
                                                {booking.slots.map((slot, i) => (
                                                    <span key={i} className="badge badge-outline">
                                                        {slot.start} - {slot.end}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-2 text-primary font-medium">
                                                <FiDollarSign />
                                                <span>Total: {booking.price}/=</span>
                                            </div>

                                            {booking.discountedPrice && booking.discountedPrice < booking.price && (
                                                <div className="flex items-center gap-2 text-success font-semibold">
                                                    <FiTag />
                                                    <span>Discounted: {booking.discountedPrice}/=</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            src={booking.courtImage}
                                            alt={booking.courtTitle}
                                            className="w-40 md:w-48 lg:w-64 object-cover rounded mt-2 md:mt-0"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-end gap-2">
                                    <button
                                        onClick={() => handleAction(booking._id, 'approved')}
                                        className="btn btn-sm btn-success flex items-center gap-1"
                                    >
                                        <FiCheck /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(booking._id, 'rejected')}
                                        className="btn btn-sm btn-error flex items-center gap-1"
                                    >
                                        <FiX /> Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages && (
                        <div className="flex justify-center mt-6">
                            <div className="join">
                                <button
                                    className="join-item btn btn-sm"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                >
                                    « Prev
                                </button>

                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        className={`join-item btn btn-sm ${currentPage === i + 1 ? 'btn-active' : ''}`}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    className="join-item btn btn-sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                >
                                    Next »
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ManageBookings;
