import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { User } from "lucide-react";
import SharedProfile from '../SharedProfile';

const MemberDashboard = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();


  // Fetch events joined
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ['member-bookings', user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/bookings?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // Fetch payments made
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ['member-payments', user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const isLoading = bookingsLoading || paymentsLoading;

  return (
    <div>
      {isLoading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="shadow rounded-2xl overflow-hidden">
          {/* Profile Details */}
          <div className="p-6">
            <SharedProfile />

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 bg-base-300 p-4 rounded-xl">
              <div className="bg-base-100 p-4 rounded-xl text-center shadow-sm">
                <User className="w-8 h-8 mx-auto text-indigo-600" />
                <p className="mt-2 font-semibold">Events Joined</p>
                <p className="text-2xl font-bold text-indigo-600">{bookings.length}</p>
              </div>
              <div className="bg-base-100 p-4 rounded-xl text-center shadow-sm">
                <User className="w-8 h-8 mx-auto text-emerald-600" />
                <p className="mt-2 font-semibold">Payments Made</p>
                <p className="text-2xl font-bold text-emerald-600">{payments.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;
