import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AddCouponModal from "./AddCouponModal";

const ManageCoupons = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchCode, setSearchCode] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // all | valid | expired

    const { data: coupons = [], isLoading } = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const res = await axiosSecure.get("/api/coupons");
            console.log("Fetched coupons:", res.data); // Debugging log
            return res.data;
        },
    });

    // Delete coupon mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return await axiosSecure.delete(`/api/coupons/${id}`);
        },
        onSuccess: () => {
            Swal.fire("Deleted!", "Coupon has been removed.", "success");
            queryClient.invalidateQueries({ queryKey: ["coupons"] });
        },
        onError: () => {
            Swal.fire("Error!", "Something went wrong!", "error");
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
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

    const now = new Date();

    // Filter coupons
    const filteredCoupons = coupons.filter((coupon) => {
        const matchesCode = coupon.code
            .toLowerCase()
            .includes(searchCode.toLowerCase());

        const matchesDate = searchDate
            ? new Date(coupon.createdAt).toISOString().slice(0, 10) === searchDate
            : true;

        const isExpired =
            coupon.expiresAt && new Date(coupon.expiresAt) < now;

        const matchesStatus =
            statusFilter === "all"
                ? true
                : statusFilter === "valid"
                    ? !isExpired
                    : isExpired;

        return matchesCode && matchesDate && matchesStatus;
    });

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
                🎟 Manage Coupons
            </h2>

            <div className="mb-4 flex justify-center">
                <button
                    onClick={() => setModalOpen(true)}
                    className="btn btn-sm btn-success"
                >
                    ➕ Add Coupon
                </button>
            </div>

            {/* Filters and Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4 justify-between">
                <input
                    type="text"
                    placeholder="Search by code"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="input input-bordered input-sm w-full"
                />

                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="input input-bordered input-sm w-full"
                />

                <select
                    className="select select-bordered select-sm w-full"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="valid">Valid</option>
                    <option value="expired">Expired</option>
                </select>                
            </div>
            

            {/* Table */}
            {isLoading ? (
                <p>Loading coupons...</p>
            ) : (
                <div className="overflow-x-auto">
                    {filteredCoupons.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No matching coupons found.
                        </p>
                    ) : (
                        <table className="table table-zebra w-full text-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Coupon Code</th>
                                    <th>Discount (%)</th>
                                    <th>Added Date</th>
                                    <th>Expiry Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCoupons.map((coupon, index) => {
                                    const isExpired =
                                        coupon.expiresAt &&
                                        new Date(coupon.expiresAt) < now;

                                    return (
                                        <tr key={coupon._id}>
                                            <td>{index + 1}</td>
                                            <td>{coupon.code}</td>
                                            <td>{coupon.discount}%</td>
                                            <td>
                                                {new Date(coupon.createdAt).toLocaleDateString()}
                                            </td>
                                            <td>
                                                {coupon.expiresAt
                                                    ? new Date(coupon.expiresAt).toLocaleDateString()
                                                    : "No Expiry"}
                                            </td>
                                            <td>
                                                {coupon.expiresAt ? (
                                                    isExpired ? (
                                                        <span className="text-red-500 font-medium">
                                                            Expired
                                                        </span>
                                                    ) : (
                                                        <span className="text-green-600 font-medium">
                                                            Valid
                                                        </span>
                                                    )
                                                ) : (
                                                    <span className="text-gray-500">N/A</span>
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleDelete(coupon._id)}
                                                    className="btn btn-xs btn-error"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* Modal */}
            <AddCouponModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};

export default ManageCoupons;
