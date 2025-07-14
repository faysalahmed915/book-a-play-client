import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const SetSlot = ({ slots, setSlots }) => {
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");

  const [error, setError] = useState("")

  const isOverlapping = (newStart, newEnd) => {
  const toMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const newStartMin = toMinutes(newStart);
  const newEndMin = toMinutes(newEnd);

  return slots.some(({ start, end }) => {
    const startMin = toMinutes(start);
    const endMin = toMinutes(end);

    // Check if new slot overlaps with existing one
    return (
      (newStartMin >= startMin && newStartMin < endMin) || // starts during an existing slot
      (newEndMin > startMin && newEndMin <= endMin) || // ends during an existing slot
      (newStartMin <= startMin && newEndMin >= endMin) // fully contains an existing slot
    );
  });
};

const handleAddSlot = () => {
    setError(""); // Reset error message
  if (startTime === endTime) {
    return setError("Start and end time cannot be the same.");
  }

  if (isOverlapping(startTime, endTime)) {
    return setError("This slot overlaps with an existing slot.");
  }

  const newSlot = { start: startTime, end: endTime };
  // const newSlot = `${startTime} - ${endTime}`;
  setSlots([...slots, newSlot]);
};


  const handleRemoveSlot = (index) => {
    const updatedSlots = slots.filter((_, i) => i !== index);
    setSlots(updatedSlots);
  };

  return (
    <div className="space-y-4">
      {/* Slot Pickers */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex items-center gap-3 input input-bordered w-full">
          <label className="label-text font-semibold">Start Time:</label>
          <TimePicker
            onChange={setStartTime}
            value={startTime}
            disableClock
            clearIcon={null}
          />
        </div>

        <div className="flex items-center gap-3 input input-bordered w-full">
          <label className="label-text font-semibold">End Time:</label>
          <TimePicker
            onChange={setEndTime}
            value={endTime}
            disableClock
            clearIcon={null}
          />
        </div>

        <button
          type="button"
          onClick={handleAddSlot}
          className="btn btn-outline self-center text-blue-600"
        >
          + Add Slot
        </button>
      </div>
    {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Display Slots */}
      {slots.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Added Slots:</h3>
          <ul className="space-y-2">
            {slots.map((slot, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-base-200 px-4 py-2 rounded"
              >
                <span>
                  {slot.start} - {slot.end}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveSlot(index)}
                  className="btn btn-sm btn-error"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SetSlot;
