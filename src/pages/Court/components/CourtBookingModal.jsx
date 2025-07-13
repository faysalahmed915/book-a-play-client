import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { format } from "date-fns";

const CourtBookingModal = ({ court, onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [price, setPrice] = useState(0);

  const handleSlotChange = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  useEffect(() => {
    setPrice(selectedSlots.length * court.price);
  }, [selectedSlots, court.price]);

  const onSubmit = async (data) => {
    const booking = {
      courtId: court._id,
      courtName: court.name,
      courtType: court.type,
      slots: selectedSlots,
      date: data.date,
      price: price,
      status: "pending", // will be updated by admin
    };

    try {
      const res = await axiosSecure.post("/bookings", booking);
      if (res.data.insertedId) {
        Swal.fire("Booked!", "Your booking is pending admin approval.", "success");
        reset();
        setSelectedSlots([]);
        onClose();
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Booking failed", "error");
    }
  };

  return (
    <dialog id="booking_modal" className="modal modal-open">
      <div className="modal-box max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="font-bold text-lg">Book: {court.name}</h3>

          <div>
            <label className="label">Court Type</label>
            <input type="text" defaultValue={court.type} readOnly className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">Available Slots</label>
            <div className="grid grid-cols-2 gap-2">
              {court.slots.map((slot) => (
                <label key={slot} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    value={slot}
                    checked={selectedSlots.includes(slot)}
                    onChange={() => handleSlotChange(slot)}
                    className="checkbox checkbox-sm"
                  />
                  {slot}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Select Date</label>
            <input
              type="date"
              {...register("date", { required: true })}
              className="input input-bordered w-full"
              min={format(new Date(), "yyyy-MM-dd")}
            />
          </div>

          <div>
            <label className="label">Total Price</label>
            <input type="text" readOnly value={`৳ ${price}`} className="input input-bordered w-full" />
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Confirm Booking
            </button>
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CourtBookingModal;
