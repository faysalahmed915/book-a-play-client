// src/hooks/useUserRole.js
import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'


const useUserRole = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const {
        data: role = null,
        isLoading,
        isError,
    } = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/users/role?email=${user.email}`);
            return res.data.role;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes: treat data as fresh for 5 mins
        cacheTime: 1000 * 60 * 10, // 10 minutes: keep cache for 10 mins before garbage collecting
        refetchOnWindowFocus: false, // optional: disable refetch when window regains focus
        placeholderData: null, // Optional: immediately return null while loading
    });


    const isAdmin = role === 'admin'
    const isMember = role === 'member'
    const isUser = role === 'user'

    return { role, isAdmin, isMember, isUser, isLoading, isError }
}

export default useUserRole
