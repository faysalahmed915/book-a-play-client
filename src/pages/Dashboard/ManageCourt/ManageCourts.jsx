import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageCourts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Courts</h2>
        <Link to="/dashboard/add-court" className="btn btn-primary flex items-center gap-2">
          <FiPlus /> Add New Court
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Image</th>
              <th>Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Max Players</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courts.map((court) => (
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
    </div>
  );
};

export default ManageCourts;
