import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FiTrash2 } from "react-icons/fi"; // delete icon
import Swal from "sweetalert2"; // nice alert for confirmation and success/error
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole";

const Announcements = () => {
    const axiosSecure = useAxiosSecure();
    const { isAdmin, isLoading: roleLoading } = useUserRole();
    const queryClient = useQueryClient();

    // Fetch announcements
    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ["announcements"],
        queryFn: async () => {
            const res = await axiosSecure.get("/api/announcements");
            return res.data;
        },
    });

    // Mutation to delete an announcement
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.delete(`/api/announcements/${id}`);
        },
        onSuccess: () => {
            Swal.fire("Deleted!", "Announcement has been deleted.", "success");
            queryClient.invalidateQueries(["announcements"]);
        },
        onError: () => {
            Swal.fire("Error", "Failed to delete announcement.", "error");
        },
    });


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will delete the announcement permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    if (isLoading || roleLoading) {
        return <p className="text-center text-gray-500">Loading announcements...</p>;
    }

    return (
        <div className="p-6">
            <Helmet>
                <title>Announcements | Book A Play</title>
            </Helmet>

            <h2 className="text-3xl font-bold mb-6 text-center">📢 Club Announcements</h2>

            {announcements.length === 0 ? (
                <p className="text-center text-gray-500">No announcements available.</p>
            ) : (
                <div className="space-y-4">
                    {announcements.map((a) => (
                        <div
                            key={a._id}
                            className="card bg-base-100 shadow-md border border-base-200 relative"
                        >
                            <div className="card-body">
                                <h3 className="card-title text-lg flex justify-between items-center">
                                    <span>{a.title}</span>
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleDelete(a._id)}
                                            className="btn btn-ghost btn-sm text-red-600 hover:text-red-800"
                                            title="Delete Announcement"
                                            aria-label="Delete Announcement"
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    )}
                                </h3>
                                <p>{a.description}</p>
                                <p className="text-sm text-right text-blue-600">
                                    {new Date(a.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Announcements;
