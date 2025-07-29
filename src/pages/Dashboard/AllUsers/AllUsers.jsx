import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const defaultImage = "https://i.ibb.co/YfFq4cS/default-avatar.png";

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/users');
      return res.data;
    },
  });

  // Filter users by search term
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination values
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

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

  return (
    <div className="p-4 bg-base-100 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">All Users</h2>

      <div className='flex flex-wrap-reverse lg:justify-between justify-center gap-2 mb-4'>
        {/* Search */}
        <div className="mb-4 flex items-center gap-3">
          <FiSearch className="text-xl" />
          <input
            type="text"
            placeholder="Search by name or email"
            className="input input-bordered w-full max-w-md"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset to page 1 when searching
            }}
          />
        </div>

        {/* Total Count */}
        <div>
          <p className="input input-bordered">
            Total Users: <span className='font-bold text-green-600'>{totalUsers}</span>
          </p>
        </div>
      </div>

      {/* User Table */}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full">
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
                {currentUsers.map((user, index) => (
                  <tr key={user._id} className='hover:bg-base-200 transition-colors duration-200'>
                    <td>{startIndex + index + 1}</td>
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

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <div className="join">
              <button
                className="join-item btn btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                « Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`join-item btn btn-sm ${currentPage === i + 1 ? 'btn-active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="join-item btn btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next »
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllUsers;
