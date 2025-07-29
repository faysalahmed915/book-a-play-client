import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar, FiClock, FiDollarSign, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useValidateCoupon from "../../../hooks/useValidateCoupon";

const CourtBookingModal = ({ court, onClose }) => {
  const { user } = useAuth();
  const axios = useAxiosSecure();

  // Custom hook for coupon validation
  const { validateCoupon, loading: couponLoading } = useValidateCoupon();

  // Local state for date, slots, coupon code, discount %, submission
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);


  // Format date for backend query
  const formattedDate = selectedDate.toISOString().split("T")[0];

  // Fetch bookings to disable booked slots
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", court._id, formattedDate],
    queryFn: async () => {
      const res = await axios.get(`/api/bookings?courtId=${court._id}&date=${formattedDate}`);
      return res.data;
    },
    enabled: !!court?._id && !!formattedDate,
  });

  // Prepare slots availability
  const bookedSlots = bookings.flatMap((b) => b.slots.map((s) => `${s.start} - ${s.end}`));
  const allSlots = court.slots.map((slot) => `${slot.start} - ${slot.end}`);
  const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

  // Toggle slot selection
  const handleSlotToggle = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  // Handle coupon apply button using the custom hook
  const handleCouponValidate = async () => {
    if (!couponCode.trim()) {
      Swal.fire("Warning", "Please enter a coupon code", "warning");
      return;
    }
    // Call custom hook's validateCoupon function
    const result = await validateCoupon(couponCode);
    // console.log("Coupon validation result:", result.data.discount);
    if (result.valid) {
      Swal.fire("Success", `Coupon Applied: ${result.data.discount}% off`, "success");
      setDiscount(result.data.discount || 0);
      setCouponApplied(true);
    } else {
      Swal.fire("Error", result.error || "Coupon is invalid or expired", "error");
      setDiscount(0);
    }
  };

  // Price calculation with discount
  const basePrice = selectedSlots.length * court.pricePerSlot;
  const totalPrice = Math.ceil(basePrice - (basePrice * discount) / 100);

  console.log("Base Price:", basePrice, "Total Price after discount:", totalPrice, discount);

  // Submit booking form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSlots.length === 0) {
      return Swal.fire("Error", "Please select at least one slot.", "error");
    }

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
      price: basePrice,
      discountedPrice: totalPrice,
      couponCode: couponCode.trim() || null,
      userEmail: user?.email,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post("/api/bookings", bookingData);
      setSubmitted(true);
      Swal.fire("Success", "Booking request sent for admin approval!", "success");

      // Optional: check if user role upgraded to member
      const roleRes = await axios.get(`/api/users/role?email=${user?.email}`);
      if (roleRes?.data?.role === "member") {
        Swal.fire("🎉 Congratulations!", "You are now a club member!", "success").then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      Swal.fire("Error", "Something went wrong. Try again!", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-lg text-red-600">
          <FiX />
        </button>

        {/* Court details */}
        <div className="mb-4">
          <img
            src={court.image}
            alt={court.title}
            className="w-full h-40 object-cover rounded-md mb-2"
          />
          <h2 className="text-xl font-bold">{court.title}</h2>
          <p className="text-sm text-gray-500">{court.type}</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date picker */}
            <div>
              <label className="label">Select Date</label>
              <div className="flex items-center gap-2">
                <FiCalendar />
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setSelectedSlots([]); // Reset slots on date change
                  }}
                  className="input input-bordered w-full"
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>

            {/* Slot selection */}
            <div>
              <label className="label">Select Slot(s)</label>
              {isLoading ? (
                <p>Loading slots...</p>
              ) : availableSlots.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableSlots.map((slot, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => handleSlotToggle(slot)}
                      className={`btn btn-sm ${selectedSlots.includes(slot) ? "btn-secondary" : "btn-outline"
                        }`}
                    >
                      <FiClock className="mr-1" /> {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-red-500">No slots available on this date.</p>
              )}
            </div>

            {/* Coupon input */}
            <div>
              <label className="label">Apply Coupon (optional)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleCouponValidate}
                  className="btn btn-accent"
                  disabled={couponApplied || couponLoading}
                >
                  {couponLoading ? "Checking..." : "Apply"}
                </button>
              </div>
            </div>

            {/* Price display */}
            <div className="flex items-center gap-2 text-accent font-semibold">
              <FiDollarSign />
              <span>Total: ৳ {totalPrice}</span>
              {discount > 0 && <span className="text-success">({discount}% discount applied)</span>}
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary w-full">
              Submit Booking Request
            </button>
          </form>
        ) : (
          <>
            {/* Booking summary */}
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Court:</strong> {court.title}
              </li>
              <li>
                <strong>Date:</strong> {selectedDate.toDateString()}
              </li>
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
