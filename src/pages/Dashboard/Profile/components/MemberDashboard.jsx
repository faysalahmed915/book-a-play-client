import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { User } from "lucide-react";

const MemberDashboard = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();

  // Fetch full user profile
  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ['member-profile', user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/users/profile?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {isLoading ? (
        <p>Loading profile...</p>
      ) : (
        <div className="bg-base-100 shadow rounded-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 flex items-center gap-4 text-white">
            <img
              src={profile.photo || '/default-avatar.png'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h3 className="text-2xl font-bold">{profile.name || 'Unnamed User'}</h3>
              <p className="opacity-90">{profile.email}</p>
              <p className="text-sm mt-1">
                Role: <span className="font-semibold capitalize">{profile.role}</span>
              </p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            {profile.role === 'member' && profile.member_at && (
              <p className="text-gray-700 text-lg">
                Member Since:{" "}
                <span className="font-semibold text-indigo-600">
                  {formatDate(profile.member_at)}
                </span>
              </p>
            )}

            {/* Example Extra Section (if you have related data) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-base-200 p-4 rounded-xl text-center shadow-sm">
                <User className="w-8 h-8 mx-auto text-indigo-600" />
                <p className="mt-2 font-semibold">Events Joined</p>
                <p className="text-2xl font-bold text-indigo-600">{profile.eventsJoined || 0}</p>
              </div>
              <div className="bg-base-200 p-4 rounded-xl text-center shadow-sm">
                <User className="w-8 h-8 mx-auto text-emerald-600" />
                <p className="mt-2 font-semibold">Payments Made</p>
                <p className="text-2xl font-bold text-emerald-600">{profile.payments || 0}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;
