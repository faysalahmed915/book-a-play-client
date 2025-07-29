import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import NoData from "../../../components/Shared/NoData/NoData";

const ITEMS_PER_PAGE = 10; // 🔢 Number of bookings per page

const ConfirmedCourts = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // ➕ Track current page

  // ✅ Fetch confirmed bookings
  const {
    data: confirmedBookings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
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

  // 🔢 Pagination logic
  const totalPages = Math.ceil(confirmedBookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = confirmedBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4 md:p-8">
      {/* 🔹 SEO */}
      <Helmet>
        <title>Confirmed Courts | Book A Play</title>
      </Helmet>

      {/* 🔹 Heading */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-primary">
        Confirmed Courts
      </h2>

      {/* 🔹 Error */}
      {isError && (
        <p className="text-red-500 text-center mb-4">
          ❌ Failed to load bookings: {error.message}
        </p>
      )}

      {/* 🔹 Loading */}
      {isLoading ? (
        <LoadingSpinner />
      ) : confirmedBookings.length === 0 ? (
        <NoData message="No confirmed bookings found." />
      ) : (
        <>
          {/* 🔹 Table */}
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
                {paginatedBookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                    <td>{booking.courtTitle}</td>
                    <td>{new Date(booking.date).toDateString()}</td>
                    <td>
                      {booking.slots.map((slot, i) => (
                        <span key={i} className="block">
                          ⏱ {slot.start} - {slot.end}
                        </span>
                      ))}
                    </td>
                    <td className="text-green-600 font-semibold">
                      {booking.discountedPrice &&
                      booking.discountedPrice < booking.price ? (
                        <>
                          <span className="line-through text-gray-500 mr-2">
                            ৳{booking.price}
                          </span>
                          <span>৳{booking.discountedPrice}</span>
                          <span className="ml-2 text-sm text-success">
                            ({booking.price - booking.discountedPrice}৳ off)
                          </span>
                        </>
                      ) : (
                        <>৳{booking.price}</>
                      )}
                    </td>
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

          {/* 🔹 Pagination Buttons */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`btn btn-sm ${
                  currentPage === index + 1 ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* 🔹 Modal for Booking Details */}
      {selectedBooking && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setSelectedBooking(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold mb-3">
              Booking Details for {selectedBooking.courtTitle}
            </h3>

            <img
              src={selectedBooking.courtImage}
              alt={`Court - ${selectedBooking.courtTitle}`}
              className="w-full h-40 object-cover rounded mb-4"
            />

            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedBooking.date).toDateString()}
            </p>

            <p className="mt-2">
              <strong>Slots:</strong>
            </p>
            <ul className="list-disc list-inside mb-3 text-sm">
              {selectedBooking.slots.map((slot, idx) => (
                <li key={idx}>
                  {slot.start} - {slot.end}
                </li>
              ))}
            </ul>

            <p>
              <strong>Price:</strong>{" "}
              {selectedBooking.discountedPrice &&
              selectedBooking.discountedPrice < selectedBooking.price ? (
                <>
                  <span className="line-through text-gray-500 mr-2">
                    ৳{selectedBooking.price}
                  </span>
                  <span className="text-green-600 font-semibold">
                    ৳{selectedBooking.discountedPrice}
                  </span>
                  <span className="ml-2 text-sm text-success">
                    ({selectedBooking.price - selectedBooking.discountedPrice}৳
                    off)
                  </span>
                </>
              ) : (
                <>৳{selectedBooking.price}</>
              )}
            </p>

            <p>
              <strong>Transaction ID:</strong>{" "}
              {selectedBooking.transactionId || "N/A"}
            </p>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ConfirmedCourts;
