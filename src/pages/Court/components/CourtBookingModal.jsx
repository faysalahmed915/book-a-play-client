import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar, FiClock, FiDollarSign, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
const CourtBookingModal = ({ court, onClose }) => {

  const { user } = useAuth();
  const axios = useAxiosSecure();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const formattedDate = selectedDate.toISOString().split("T")[0]; // yyyy-mm-dd

  // Fetch existing bookings for this court on selected date
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", court._id, formattedDate],
    queryFn: async () => {
      const res = await axios.get(`/api/bookings?courtId=${court._id}&date=${formattedDate}`);
      console.log("Fetched bookings:", res.data);
      return res.data;
    },
    enabled: !!court?._id && !!formattedDate,
  });


  // Extract booked slots
  const bookedSlots = bookings.flatMap((booking) =>
    booking.slots.map((slot) => `${slot.start} - ${slot.end}`)
  );

  // Format all slots and filter available
  const allSlots = court.slots.map((slot) => `${slot.start} - ${slot.end}`);
  const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

  const handleSlotToggle = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedSlots.length === 0) {
      return Swal.fire("Error", "Please select at least one slot.", "error");
    }

    // Prepare data to send
    const slotObjects = selectedSlots.map((slot) => {
      const [start, end] = slot.split(" - ");
      return { start, end };
    });

    const bookingData = {
      courtId: court._id,
      courtTitle: court.title,
      courtImage: court.image,
      courtType: court.type,
      courtLocation: court.location || "Dhaka",
      courtDescription: court.description,
      date: formattedDate,
      slots: slotObjects,
      price: selectedSlots.length * court.pricePerSlot,
      userEmail: user?.email,
      status: "pending", // initial state
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post("/api/bookings", bookingData);

      console.log("Booking request sent:", bookingData);
      Swal.fire("Success", "Booking request sent for admin approval!", "success");
      setSubmitted(true);

      // ✅ Check updated role
      const roleRes = await axios.get(`/api/users/role?email=${user?.email}`);
      const newRole = roleRes?.data?.role;

      if (newRole === "member") {
        // 🎉 Show congratulation and refresh dashboard
        Swal.fire("🎉 Congratulations!", "You are now a club member!", "success")
          .then(() => {
            // 🧭 Reload or redirect to load member dashboard
            window.location.reload(); // OR use navigate('/dashboard/member')
          });
      }

    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Something went wrong. Try again!", "error");
    }
  };

  const totalPrice = selectedSlots.length * court.pricePerSlot;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-lg text-red-600"
        >
          <FiX />
        </button>

        {/* Court Info */}
        <div className="mb-4">
          <img src={court.image} alt={court.title} className="w-full h-40 object-cover rounded-md mb-2" />
          <h2 className="text-xl font-bold">{court.title}</h2>
          <p className="text-sm text-gray-500">{court.type}</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date Picker */}
            <div>
              <label className="label">Select Date</label>
              <div className="flex items-center gap-2">
                <FiCalendar />
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setSelectedSlots([]); // reset slots on date change
                  }}
                  className="input input-bordered w-full"
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>

            {/* Slot Selection */}
            <div>
              <label className="label">Select Slot(s)</label>
              {isLoading ? (
                <p>Loading slots...</p>
              ) : availableSlots.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableSlots.map((slot, idx) => {
                    const isSelected = selectedSlots.includes(slot);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleSlotToggle(slot)}
                        className={`btn btn-sm ${isSelected ? "btn-secondary" : "btn-outline"
                          }`}
                      >
                        <FiClock className="mr-1" /> {slot}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-red-500">No slots available on this date.</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Submit Booking Request
            </button>
          </form>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>Court:</strong> {court.title}</li>
              <li><strong>Date:</strong> {selectedDate.toDateString()}</li>
              <li>
                <strong>Slots:</strong>{" "}
                {selectedSlots.map((slot, i) => (
                  <span key={i} className="badge badge-outline mr-1">
                    {slot}
                  </span>
                ))}
              </li>
              <li className="flex items-center gap-2 text-accent font-semibold mt-2">
                <FiDollarSign />
                <span>Total: ৳ {totalPrice}</span>
              </li>
            </ul>
            <div className="mt-6 flex justify-end gap-2">
              <button className="btn btn-outline" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourtBookingModal;
