// Announcements.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const Announcements = () => {
    const axiosSecure = useAxiosSecure();

    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ["announcements"],
        queryFn: async () => {
            const res = await axiosSecure.get("/api/announcements");
            return res.data;
        },
    });

    return (
        <div className="p-6">
            <Helmet>
                <title>Announcements | Book A Play</title>
            </Helmet>

            <h2 className="text-3xl font-bold mb-6 text-center">📢 Club Announcements</h2>

            {isLoading ? (
                <p className="text-center text-gray-500">Loading announcements...</p>
            ) : announcements.length === 0 ? (
                <p className="text-center text-gray-500">No announcements available.</p>
            ) : (
                <div className="space-y-4">
                    {announcements.map(a => (
                        <div
                            key={a._id}
                            className="card bg-base-100 shadow-md border border-base-200"
                        >
                            <div className="card-body">
                                <h3 className="card-title text-lg">{a.title}
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
