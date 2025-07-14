import React from 'react'
import useUserData from '../../../../hooks/useUserData'
import LoadingSpinner from '../../../../components/ui/Loading/LoadingSpinner'

const ProfilePage = () => {
    const { userData, isLoading, isError } = useUserData()

    if (isLoading) return <LoadingSpinner />
    if (isError || !userData) return <p className="text-red-500">Failed to load profile.</p>

    const { name, email, photo, created_at, member_at, admin_at } = userData

    return (
        <div className="mx-auto bg-base-300 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

            <div className="flex items-center gap-12 mb-4">
                <img src={photo} alt="User" className="w-20 h-20 rounded-full object-cover border" />
                <div>
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p>{email}</p>
                    {/* <p className="text-smcapitalize">{role}</p> */}
                </div>
            </div>

            <div className="text-sm space-y-2">
                <p>
                    Joined on {new Date(created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>

                {member_at && <p><strong>Became Member:</strong> {new Date(member_at).toLocaleDateString()}</p>}
                {admin_at && <p><strong>Became Admin:</strong> {new Date(admin_at).toLocaleDateString()}</p>}
            </div>
        </div>
    )
}

export default ProfilePage
