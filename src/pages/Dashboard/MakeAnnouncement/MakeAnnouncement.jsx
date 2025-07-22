import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post("/api/announcements", formData);
      return res.data;
    },
    onSuccess: () => {
      setFormData({ title: "", description: "" });
      queryClient.invalidateQueries(["announcements"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      mutate();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Helmet>
        <title>Make Announcement | Book A Play</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center">📣 Make Announcement</h2>

      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-lg p-6 space-y-4"
      >
        <div>
          <label className="label font-semibold">Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label font-semibold">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full min-h-32"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isPending}
        >
          {isPending ? "Posting..." : "Post Announcement"}
        </button>

        {isSuccess && ( 
          <p className="text-green-500 text-center">✅ Announcement posted!</p>
        )}
        {isError && (
          <p className="text-red-500 text-center">❌ {error.message}</p>
        )}
      </form>
    </div>
  );
};

export default MakeAnnouncement;
