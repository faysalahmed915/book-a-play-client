import { useState } from "react";
import { useNavigate } from "react-router";
import { FiClock } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import CourtBookingModal from "./components/CourtBookingModal";
import LoadingSpinner from "../../components/ui/Loading/LoadingSpinner";

const Courts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const Axios = useAxios();

  const [selectedCourt, setSelectedCourt] = useState(null);

  // Pagination state
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch court data using TanStack Query
  const {
    data: courts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await Axios.get("/api/courts");
      return res.data;
    },
  });

  // Pagination calculations
  const totalPages = Math.ceil(courts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedCourts = courts.slice(startIdx, startIdx + itemsPerPage);

  // Booking button handler
  const handleBookNow = (court) => {
    if (!user) {
      navigate("/auth/login", { state: { from: location.pathname } });
    } else {
      setSelectedCourt(court);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load courts: {error.message}
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Available Courts</h2>

      {/* COURT CARD GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCourts.map((court) => (
          <div key={court._id} className="card bg-base-100 shadow-md">
            <figure>
              <img src={court.image} alt={court.title} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="text-xl font-semibold">{court.title}</h3>
              <p className="text-sm text-gray-500">{court.type}</p>

              {/* Slot List */}
              <h3 className="flex items-center gap-2.5"><FiClock className="text-green-600" />Slots for this Court:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {court.slots.map((slot, index) => (
                  <span
                    key={index}
                    className="bg-secondary opacity-80 text-secondary-content text-xs font-medium px-2 py-1 rounded"
                  >
                    {slot.start} - {slot.end}
                  </span>
                ))}
              </div>

              {/* Price per Slot */}
              <p className="flex items-center gap-2 text-accent-content font-semibold">
                <FaMoneyBillWave /> {court.pricePerSlot}/- per slot
              </p>

              {/* Book Now Button */}
              <button onClick={() => handleBookNow(court)} className="btn btn-sm btn-secondary mt-4">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION CONTROLS */}
      <div className="mt-10 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="btn btn-outline btn-sm"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn btn-sm ${currentPage === page ? "btn-secondary" : "btn-outline"}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="btn btn-outline btn-sm"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* BOOKING MODAL */}
      {selectedCourt && (
        <CourtBookingModal court={selectedCourt} onClose={() => setSelectedCourt(null)} />
      )}
    </section>
  );
};

export default Courts;
