import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');

    const defaultImage = "https://i.ibb.co/YfFq4cS/default-avatar.png";

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/users');
            return res.data;
        },
    });

    const handleChangeRole = async (userId, newRole) => {
        try {
            const res = await axiosSecure.patch(`/api/users/${userId}/role/${newRole}`);
            if (res.data.success) {
                Swal.fire("Success", `Role updated to ${newRole}`, "success");
                refetch();
            } else {
                Swal.fire("Notice", "No changes were made", "info");
                refetch();
            }
        } catch (error) {
            console.error("Failed to update role:", error);
            Swal.fire("Error", "Failed to update user role", "error");
        }
    };

    const handleDelete = async (userId) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            await axiosSecure.delete(`/api/users/${userId}`);
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            refetch();
        }
    };

    const filteredUsers = users.filter((user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 bg-base-100 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4">All Users ({users.length})</h2>

            <div className="mb-4 flex items-center gap-3">
                <FiSearch className="text-xl" />
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="input input-bordered w-full max-w-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full rounded-2xl shadow-lg">
                        <thead className='bg-secondary text-secondary-content'>
                            <tr>
                                <th>#</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user._id} className='hover:bg-base-200 transition-colors duration-200'>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={user.photo || defaultImage}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <select
                                            defaultValue=""
                                            className="select select-bordered select-sm"
                                            onChange={(e) => handleChangeRole(user._id, e.target.value)}
                                        >
                                            <option disabled value="">{user.role || 'user'}</option>
                                            {["user", "member", "admin"]
                                                .filter((role) => role !== (user.role || 'user'))
                                                .map((role) => (
                                                    <option key={role} value={role}>
                                                        Set {role.charAt(0).toUpperCase() + role.slice(1)}
                                                    </option>
                                                ))}
                                        </select>
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn btn-xs btn-error"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllUsers;
