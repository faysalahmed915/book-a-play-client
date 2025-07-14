import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner"
import useUserRole from "../../../hooks/useUserRole"
import UserProfile from "./components/UserProfile"


const Profile = () => {
  const { isAdmin, isMember, isLoading } = useUserRole()

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      {isAdmin && <p>Welcome Admin</p>}
      {isMember && <p>Welcome Member</p>}
      {!isAdmin && !isMember && <UserProfile />}
    </div>
  )
}

export default Profile;
