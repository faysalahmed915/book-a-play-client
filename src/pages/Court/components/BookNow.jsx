// // src/pages/BookNow.jsx
// import { useLocation, useNavigate } from "react-router";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import Swal from "sweetalert2";
// import useAuth from "../../../hooks/useAuth";

// const BookNow = () => {
//   const { state } = useLocation();
//   const court = state?.court;
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [selectedSlots, setSelectedSlots] = useState([]);
  
//   const slotCount = selectedSlots.length;
//   const totalPrice = slotCount * court.pricePerSlot;


//   if (!court) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-center text-xl text-red-600 font-bold">No court data found.</p>
//       </div>
//     );
//   }

//   const handleSlotToggle = (slot) => {
//     setSelectedSlots((prev) =>
//       prev.includes(slot)
//         ? prev.filter((s) => s !== slot)
//         : [...prev, slot]
//     );
//   };

//   const onSubmit = (data) => {



//     const bookingData = {
//       courtId: court._id,
//       courtTitle: court.title,
//       userEmail: user.email,
//       userName: user.displayName,
//       date: data.date,
//       selectedSlots,
//       totalPrice,
//       status: "pending",
//       bookedAt: new Date().toISOString(),
//     };

//     // TODO: send to backend
//     console.log("Booking Data →", bookingData);

//     Swal.fire("Success", "Booking request submitted!", "success");
//     reset();
//     navigate("/dashboard/myBookings");
//   };

//   return (
//     <section className="max-w-5xl mx-auto px-4 py-10">
//       <div className="grid md:grid-cols-2 gap-10">
//         {/* Court Info */}
//         <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
//           <img src={court.image} alt={court.title} className="w-full h-64 object-cover" />
//           <div className="p-6 space-y-2">
//             <h2 className="text-2xl font-bold">{court.title}</h2>
//             <p className="text-sm text-gray-500">Type: {court.type}</p>
//             <p className="text-gray-600">{court.description}</p>
//             <p className="text-sm text-gray-400">Max Players: {court.maxPlayers}</p>
//             <p className="font-semibold text-primary">৳ {court.pricePerSlot} per slot</p>
//           </div>
//         </div>

//         {/* Booking Form */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="bg-base-100 shadow-xl rounded-lg p-6 space-y-5"
//         >
//           <h3 className="text-xl font-bold mb-4">Complete Your Booking</h3>

//           {/* Date */}
//           <div>
//             <label className="label font-medium">Select Date</label>
//             <input
//               type="date"
//               {...register("date", { required: "Date is required" })}
//               className="input input-bordered w-full"
//             />
//             {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
//           </div>

//           {/* Slots */}
//           <div>
//             <label className="label font-medium">Choose Slots</label>
//             <div className="grid grid-cols-2 gap-2">
//               {court.slots.map((slot, index) => {
//                 const label = `${slot.start} - ${slot.end}`;
//                 const isSelected = selectedSlots.includes(label);
//                 return (
//                   <button
//                     type="button"
//                     key={index}
//                     onClick={() => handleSlotToggle(label)}
//                     className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-outline"}`}
//                   >
//                     {label}
//                   </button>
//                 );
//               })}
//             </div>
//             {selectedSlots.length === 0 && (
//               <p className="text-sm text-red-500 mt-2">Please select at least one slot.</p>
//             )}
//           </div>

//           {/* Total Price */}
//           <div className="mt-2">
//             <p className="font-semibold text-green-600">
//               Total Price: ৳ {totalPrice || 0}/-
//             </p>
//           </div>

//           <button
//             type="submit"
//             disabled={!selectedSlots.length}
//             className="btn btn-success w-full"
//           >
//             Book Now
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default BookNow;
