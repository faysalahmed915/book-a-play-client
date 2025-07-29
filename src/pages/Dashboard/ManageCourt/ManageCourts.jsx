import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageCourts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const courtsPerPage = 10;

  // GET all courts
  const { data: courts = [], isLoading, isError } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/courts');
      return res.data;
    },
  });

  // DELETE court
  const { mutateAsync: deleteCourt } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/api/courts/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Deleted!', 'Court has been removed.', 'success');
      queryClient.invalidateQueries(['courts']);
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to delete court.', 'error');
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this court!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourt(id);
      }
    });
  };

  if (isLoading) return <p>Loading courts...</p>;
  if (isError) return <p>Failed to load courts.</p>;

  // Pagination logic
  const totalPages = Math.ceil(courts.length / courtsPerPage);
  const startIndex = (currentPage - 1) * courtsPerPage;
  const paginatedCourts = courts.slice(startIndex, startIndex + courtsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Manage Courts</h2>
        <Link to="/dashboard/addCourt" className="btn btn-secondary text-secondary-content flex items-center gap-2">
          <FiPlus /> Add New Court
        </Link>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
        <table className="table w-full">
          <thead>
            <tr className="bg-accent text-accent-content">
              <th>Image</th>
              <th>Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Max Players</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourts.map((court) => (
              <tr key={court._id}>
                <td>
                  <img
                    src={court.image}
                    alt={court.title}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td>{court.title}</td>
                <td>{court.type}</td>
                <td>${court.price}</td>
                <td>{court.maxPlayers}</td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      to={`/dashboard/update-court/${court._id}`}
                      className="btn btn-sm btn-warning"
                    >
                      <FiEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(court._id)}
                      className="btn btn-sm btn-error"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages && (
        <div className="flex justify-center mt-6">
          <div className="join">
            <button
              className="join-item btn btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
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
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourts;
