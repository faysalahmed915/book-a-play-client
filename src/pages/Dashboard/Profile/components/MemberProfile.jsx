import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const MemberProfile = () => {
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
        <div className="bg-base-100 shadow rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={profile.photo || '/default-avatar.png'}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <div>
              <h3 className="text-xl font-semibold">{profile.name || 'Unnamed User'}</h3>
              <p className="text-gray-500">{profile.email}</p>
              <p className="text-sm mt-1">Role: <span className="font-medium capitalize">{profile.role}</span></p>
            </div>
          </div>

          {profile.role === 'member' && profile.member_at && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Member Since: <span className="font-semibold">{formatDate(profile.member_at)}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberProfile;
