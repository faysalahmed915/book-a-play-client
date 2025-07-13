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
      const res = await axiosSecure.get(`/api/users/role?email=${user.email}`)
      return res.data.role // expected { role: "admin" }
    },
  })

  const isAdmin = role === 'admin'
  const isMember = role === 'member'
  const isUser = role === 'user'

  return { role, isAdmin, isMember, isUser, isLoading, isError }
}

export default useUserRole
