import React from 'react';
import { FiCalendar, FiClock, FiDollarSign, FiTrash } from 'react-icons/fi';

const PendingBookingCard = ({ booking, handleCancel, cancelBookingMutation }) => {
    // console.log(booking)
    return (
        <div key={booking._id} className="border rounded-lg py-4 px-4 md:px-6 lg:px-8 bg-base-300 shadow">
            <div className='flex gap-4 flex-wrap-reverse justify-center sm:justify-between items-center'>
                <div>
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                        <div>
                            <h3 className="text-xl font-semibold">{booking.courtTitle}</h3>
                            <p className="text-sm text-gray-500">Type: {booking.courtType}</p>
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
                        <div className="flex items-center gap-2 text-accent font-medium">
                            <FiDollarSign />
                            <span>Total: {booking.price}/=</span>
                        </div>
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

            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => handleCancel(booking._id)}
                    className="btn btn-sm btn-error flex items-center gap-1"
                    disabled={cancelBookingMutation.isLoading} // ✅ Prevent multiple clicks
                >
                    <FiTrash /> Cancel Booking
                </button>
            </div>
        </div>
    );
};

export default PendingBookingCard;