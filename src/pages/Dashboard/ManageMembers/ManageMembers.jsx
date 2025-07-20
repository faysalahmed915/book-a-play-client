import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageMembers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const defaultImage = "https://i.ibb.co/YfFq4cS/default-avatar.png";

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['members-only'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/users');
            return res.data.filter(user => user.role === 'member');
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
            <h2 className="text-2xl font-bold mb-4 text-center">Manage Members</h2>

            <div className='flex flex-wrap-reverse lg:justify-between justify-center gap-2 mb-4'>
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
                <div>
                    <p className="input input-bordered">
                        Total Members: <span className='font-bold text-green-600'>{users.length}</span>
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className='bg-secondary text-secondary-content'>
                            <tr>
                                <th>#</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Member Since</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user._id} className='hover:bg-base-200 transition-colors duration-200'>
                                    <td>{index + 1}</td>

                                    <td>
                                        <div
                                            className="tooltip tooltip-bottom"
                                            data-tip="Click to view details"
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            <img
                                                src={user.photo || defaultImage}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-110 transition-transform"
                                            />
                                        </div>
                                    </td>

                                    <td>
                                        <span
                                            title="Click to view details"
                                            onClick={() => setSelectedUser(user)}
                                            className="cursor-pointer text-primary font-semibold hover:underline"
                                        >
                                            {user.name}
                                        </span>
                                    </td>

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

                                    <td>{new Date(user.member_at || user.created_at).toLocaleDateString()}</td>

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

            {/* Details Modal */}
            {selectedUser && (
                <dialog id="member-details-modal" className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-lg mb-4">Member Details</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={selectedUser.photo || defaultImage}
                                alt={selectedUser.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <p><strong>Name:</strong> {selectedUser.name}</p>
                                <p><strong>Email:</strong> {selectedUser.email}</p>
                                <p><strong>Role:</strong> {selectedUser.role}</p>
                                <p><strong>Joined:</strong> {new Date(selectedUser.member_at || selectedUser.created_at).toLocaleString()}</p>
                                <p><strong>Last Login:</strong> {new Date(selectedUser.last_logged_in).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">Login History:</h4>
                            <ul className="list-disc list-inside space-y-1 max-h-40 overflow-y-auto">
                                {selectedUser.login_history?.map((entry, idx) => (
                                    <li key={idx}>{new Date(entry).toLocaleString()}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button
                                    className="btn"
                                    onClick={() => setSelectedUser(null)}
                                >Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ManageMembers;
