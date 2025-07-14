import { useState } from "react";
import { useNavigate } from "react-router";
import { FiClock } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import CourtBookingModal from "./components/CourtBookingModal";

const Courts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const Axios = useAxios();
  const [selectedCourt, setSelectedCourt] = useState(null);

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

  const handleBookNow = (court) => {
    if (!user) {
      navigate("/auth/login", { state: { from: "/courts" } });
    } else {
      setSelectedCourt(court);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
        <p>Loading courts...</p>
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <div key={court._id} className="card bg-base-100 shadow-md">
            <figure>
              <img src={court.image} alt={court.title} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="text-xl font-semibold">{court.title}</h3>
              <p className="text-sm text-gray-500">{court.type}</p>

              {/* Slots */}
              <h3 className="flex items-center gap-2.5"><FiClock className="text-green-600" />Slots for this Court :</h3>
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


              {/* Price */}
              <p className="flex items-center gap-2 text-accent-content font-semibold">
                <FaMoneyBillWave /> {court.pricePerSlot}/- per slot
              </p>
              <button onClick={() => handleBookNow(court)} className="btn btn-sm btn-secondary mt-4">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCourt && (
        <CourtBookingModal court={selectedCourt} onClose={() => setSelectedCourt(null)} />
      )}
    </section>
  );
};

export default Courts;
