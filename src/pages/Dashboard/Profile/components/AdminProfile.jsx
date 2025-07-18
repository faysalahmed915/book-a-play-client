import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AdminProfile = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();

  // Fetch full admin profile
  const { data: adminProfile = {}, isLoading: loadingProfile } = useQuery({
    queryKey: ['admin-profile', user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/users/profile?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // Fetch court count
  const { data: courts = [] } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const res = await axios.get('/api/courts');
      return res.data;
    }
  });

  // Fetch all users to count roles
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('/api/users');
      return res.data;
    }
  });

  const totalCourts = courts.length;
  const totalUsers = users.length;
  const totalMembers = users.filter(u => u.role === 'member').length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>

      {loadingProfile ? (
        <p>Loading profile...</p>
      ) : (
        <div className="bg-base-100 shadow rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={adminProfile.photo || '/default-avatar.png'}
              alt="Admin"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <div>
              <h3 className="text-xl font-semibold">{adminProfile.name || 'Unnamed Admin'}</h3>
              <p className="text-gray-500">{adminProfile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-base-200 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Total Courts</h4>
              <p className="text-xl font-bold text-primary">{totalCourts}</p>
            </div>
            <div className="bg-base-200 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Total Users</h4>
              <p className="text-xl font-bold text-primary">{totalUsers}</p>
            </div>
            <div className="bg-base-200 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Total Members</h4>
              <p className="text-xl font-bold text-primary">{totalMembers}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
