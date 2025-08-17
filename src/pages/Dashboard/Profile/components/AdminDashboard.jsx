import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import { Users, User, Building2, Edit } from "lucide-react";
// import { useState } from 'react';
import SharedProfile from '../SharedProfile';

const AdminDashboard = () => {
  // const { user } = useAuth();
  const axios = useAxiosSecure();
  // const [editing, setEditing] = useState(false);

  // Fetch profile
  // const { data: profile = {}, isLoading: loadingProfile, refetch } = useQuery({
  //   queryKey: ['profile', user?.email],
  //   queryFn: async () => {
  //     const res = await axios.get(`/api/users/profile?email=${user.email}`);
  //     return res.data;
  //   },
  //   enabled: !!user?.email
  // });

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
    { name: 'Admins', value: totalUsers - totalMembers },
  ];
  const COLORS = ['#4f46e5', '#f59e0b'];

  const barData = [
    { name: 'Courts', value: totalCourts },
    { name: 'Users', value: totalUsers },
    { name: 'Members', value: totalMembers },
  ];

  // Handle update (mock example, replace with form + API)
  // Inside Dashboard.jsx (replace handleUpdate)
// const handleUpdate = async () => {
//   try {
//     await axios.patch(`/api/users/${profile._id}`, {
//       name: profile.name,
//       phone: profile.phone,
//       address: profile.address,
//       photo: profile.photo,
//     });

//     refetch();      // Refresh profile data
//     setEditing(false);
//   } catch (error) {
//     console.error("Profile update failed:", error);
//     alert("Failed to update profile");
//   }
// };


  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Profile Section */}
      {/* <section>
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        {loadingProfile ? (
          <p>Loading profile...</p>
        ) : (
          <div className="bg-base-100 shadow rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
            <img
              src={profile.photo || '/default-avatar.png'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <div className="flex-1">
              {!editing ? (
                <>
                  <h3 className="text-xl font-semibold">{profile.name || 'Unnamed User'}</h3>
                  <p className="text-gray-500">{profile.email}</p>
                  <p className="mt-2">Phone: {profile.phone || 'Not set'}</p>
                  <p>Address: {profile.address || 'Not set'}</p>
                  <button
                    onClick={() => setEditing(true)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
                  >
                    <Edit className="w-4 h-4" /> Update
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    defaultValue={profile.name}
                    placeholder="Name"
                    className="input input-bordered w-full"
                    onChange={(e) => (profile.name = e.target.value)}
                  />
                  <input
                    type="text"
                    defaultValue={profile.phone}
                    placeholder="Phone"
                    className="input input-bordered w-full"
                    onChange={(e) => (profile.phone = e.target.value)}
                  />
                  <input
                    type="text"
                    defaultValue={profile.address}
                    placeholder="Address"
                    className="input input-bordered w-full"
                    onChange={(e) => (profile.address = e.target.value)}
                  />
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={handleUpdate}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section> */}
      <SharedProfile></SharedProfile>

      {/* Overview Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">System Overview</h2>

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
            <h3 className="text-lg font-semibold mb-4">System Stats</h3>
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
      </section>
    </div>
  );
};

export default AdminDashboard;
