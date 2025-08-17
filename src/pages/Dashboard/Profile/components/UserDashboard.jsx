import React from 'react'
import useUserData from '../../../../hooks/useUserData'
import LoadingSpinner from '../../../../components/ui/Loading/LoadingSpinner'
import SharedProfile from '../SharedProfile'

const UserDashboard = () => {
    const { userData, isLoading, isError } = useUserData()

    if (isLoading) return <LoadingSpinner />
    if (isError || !userData) return <p className="text-red-500">Failed to load profile.</p>

    

    return (
        <div className="mx-auto bg-base-300 p-6 rounded-lg shadow-md">
            <SharedProfile></SharedProfile>
        </div>
    )
}

export default UserDashboard
