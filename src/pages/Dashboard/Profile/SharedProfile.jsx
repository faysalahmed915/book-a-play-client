import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Profile = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch profile
  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/users/profile?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation for updating profile
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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-base-100 shadow rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
        <img
          src={profile.photo || '/default-avatar.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full border object-cover"
        />
        <div className="flex-1">
          {!editing ? (
            <>
              <h3 className="text-xl font-semibold">{profile.name || 'Unnamed'}</h3>
              <p>Email: {profile.email}</p>
              <p>Phone: {profile.phone || 'Not set'}</p>
              <p>Address: {profile.address || 'Not set'}</p>
              <button
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl"
                onClick={() => {
                  setEditing(true);
                  setFormData({
                    name: profile.name || '',
                    phone: profile.phone || '',
                    address: profile.address || '',
                  });
                }}
              >
                Update
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

export default Profile;
