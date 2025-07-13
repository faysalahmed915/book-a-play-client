import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FiClock, FiDollarSign } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const Courts = () => {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axios = useAxios();

  useEffect(() => {
    // Fetch courts data
    const fetchCourts = async () => {
      try {
        const res = await axios.get("/courts");
        setCourts(res.data);
      } catch (err) {
        console.error("Error fetching courts", err);
      }
    };

    fetchCourts();
  }, [axios]);

  const handleBookNow = (court) => {
    if (!user) {
      navigate("/login", { state: { from: "/courts" } });
    } else {
      setSelectedCourt(court);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Available Courts</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <div key={court._id} className="card bg-base-100 shadow-md">
            <figure>
              <img src={court.image} alt={court.name} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="text-xl font-semibold">{court.name}</h3>
              <p className="text-sm text-gray-500">{court.type}</p>
              <p className="flex items-center gap-2 text-primary mt-2">
                <FiClock /> Slots: {court.slots.join(", ")}
              </p>
              <p className="flex items-center gap-2 text-accent font-semibold">
                <FiDollarSign /> ৳ {court.price} per session
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
