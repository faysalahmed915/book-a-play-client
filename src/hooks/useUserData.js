// src/hooks/useUserData.js
import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'

const useUserData = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const {
    data: userData = null,
    isLoading,
    isError,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['userData', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/profile?email=${user.email}`)
      return res.data
    },
  })

  return { userData, isLoading, isError }
}

export default useUserData
