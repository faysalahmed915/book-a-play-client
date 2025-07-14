import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import SetSlot from "./SetSlot";

const AddCourtForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [slots, setSlots] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutateAsync: saveCourt, isPending } = useMutation({
    mutationFn: async (formattedData) => {
       console.log("Sending data to backend:", formattedData);
      const res = await axiosSecure.post("/api/courts", formattedData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Court added successfully", "success");
      reset();
    },
    onError: () => {
      Swal.fire("Error", "Failed to add court", "error");
    },
  });

  const onSubmit = async (data) => {
    const formattedData = {
      title: data.title,
      type: data.type,
      description: data.description,
      tags: data.tags.split(",").map((tag) => tag.trim()),
      image: data.image,
      pricePerSlot: parseFloat(data.pricePerSlot),
      maxPlayers: parseInt(data.maxPlayers),
      slots: slots,
      addedBy: user?.email || "unknown",
      status: "active",
      createdAt: new Date().toISOString(),
    };
console.log("Formatted Court Data:", formattedData);
    await saveCourt(formattedData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-base-100 shadow-xl p-8 rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Court</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="label">Court Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Type */}
        <div>
          <label className="label">Court Type</label>
          <input
            type="text"
            placeholder="Tennis, Badminton, etc."
            {...register("type", { required: "Type is required" })}
            className="input input-bordered w-full"
          />
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
        </div>

        {/* Image */}
        <div>
          <label className="label">Image URL</label>
          <input
            type="url"
            {...register("image", { required: "Image is required" })}
            className="input input-bordered w-full"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="label">Price Per Slot</label>
          <input
            type="number"
            {...register("pricePerSlot", { required: "Price is required" })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Max Players */}
        <div>
          <label className="label">Max Players</label>
          <input
            type="number"
            {...register("maxPlayers", { required: "Max players required" })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Time Slots */}
        <div>
          <SetSlot slots={slots} setSlots={setSlots} />
        </div>

        {/* Tags */}
        <div>
          <label className="label">Tags (comma separated)</label>
          <input
            type="text"
            placeholder="indoor,tennis,AC"
            {...register("tags", { required: "Tags are required" })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            {...register("description", { required: "Description required" })}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-secondary text-secondary-content w-full"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Add Court"}
        </button>
      </form>
    </div>
  );
};

export default AddCourtForm;
