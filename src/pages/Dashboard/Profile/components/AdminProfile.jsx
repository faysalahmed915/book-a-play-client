import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import { Users, User, Building2 } from "lucide-react"; // icons

const AdminOverview = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();

  // Fetch admin profile
  const { data: adminProfile = {}, isLoading: loadingProfile } = useQuery({
    queryKey: ['admin-profile', user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/users/profile?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // Fetch courts
  const { data: courts = [] } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const res = await axios.get('/api/courts');
      return res.data;
    }
  });

  // Fetch users
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('/api/users');
      return res.data;
    }
  });

  // Stats
  const totalCourts = courts.length;
  const totalUsers = users.length;
  const totalMembers = users.filter(u => u.role === 'member').length;

  // Chart data
  const pieData = [
    { name: 'Members', value: totalMembers },
    { name: 'Admins', value: totalUsers - totalMembers }, // rest are admins
  ];
  const COLORS = ['#4f46e5', '#f59e0b'];

  const barData = [
    { name: 'Courts', value: totalCourts },
    { name: 'Users', value: totalUsers },
    { name: 'Members', value: totalMembers },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>

      {/* Admin Profile */}
      {loadingProfile ? (
        <p>Loading profile...</p>
      ) : (
        <div className="bg-base-100 shadow rounded-2xl p-6 mb-8 flex items-center gap-4">
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
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {/* Courts */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <Building2 className="w-10 h-10 opacity-80" />
            <span className="text-3xl font-bold">{totalCourts}</span>
          </div>
          <p className="mt-2 text-lg">Total Courts</p>
        </div>

        {/* Users */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <Users className="w-10 h-10 opacity-80" />
            <span className="text-3xl font-bold">{totalUsers}</span>
          </div>
          <p className="mt-2 text-lg">Total Users</p>
        </div>

        {/* Members */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <User className="w-10 h-10 opacity-80" />
            <span className="text-3xl font-bold">{totalMembers}</span>
          </div>
          <p className="mt-2 text-lg">Total Members</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-base-100 shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">User Role Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-base-100 shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">System Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
