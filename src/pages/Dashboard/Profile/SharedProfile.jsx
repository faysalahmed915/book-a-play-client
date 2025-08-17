import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Edit } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SharedProfile = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch full profile
  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/users/profile?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation to update profile
  const mutation = useMutation({
    mutationFn: async (data) => axios.patch(`/api/users/${profile._id}`, data),
    onSuccess: () => {
      queryClient.setQueryData(['profile', user?.email], (old = {}) => ({
        ...old,
        ...formData,
      }));
      setEditing(false);
    },
    onError: (err) => {
      console.error('Update failed', err);
      alert('Update failed');
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    mutation.mutate(formData);
  };

  if (isLoading) return <p>Loading profile...</p>;

  return (
    <div className="p-6 bg-base-300 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <div className="flex flex-col sm:flex-row items-center gap-6 bg-base-100 p-6 rounded-2xl shadow">
        <img
          src={profile.photo || '/default-avatar.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div className="flex-1">
          {!editing ? (
            <>
              <h3 className="text-xl font-semibold">{profile.name || 'Unnamed'}</h3>
              <p>Email: {profile.email}</p>
              <p>Phone: {profile.phone || 'Not set'}</p>
              <p>Address: {profile.address || 'Not set'}</p>
              <p>Role: <span className="capitalize font-medium">{profile.role || 'user'}</span></p>
              <p className="text-sm mt-2">
                Joined: {new Date(profile.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              {profile.member_at && (
                <p className="text-sm">
                  Became Member: {new Date(profile.member_at).toLocaleDateString()}
                </p>
              )}
              {profile.admin_at && (
                <p className="text-sm">
                  Became Admin: {new Date(profile.admin_at).toLocaleDateString()}
                </p>
              )}
              <button
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl inline-flex items-center gap-2"
                onClick={() => {
                  setEditing(true);
                  setFormData({
                    name: profile.name || '',
                    phone: profile.phone || '',
                    address: profile.address || '',
                    role: profile.role || 'user',
                  });
                }}
              >
                <Edit className="w-4 h-4" /> Update
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Name"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Phone"
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Address"
              />
              
              <div className="flex gap-3 mt-3">
                <button
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 rounded-xl"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedProfile;
