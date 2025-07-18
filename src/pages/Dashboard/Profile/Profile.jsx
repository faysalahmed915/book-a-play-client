import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner"
import useUserRole from "../../../hooks/useUserRole"
import AdminProfile from "./components/AdminProfile"
import MemberProfile from "./components/MemberProfile"
import UserProfile from "./components/UserProfile"


const Profile = () => {
  const { isAdmin, isMember, isLoading } = useUserRole()

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      {isAdmin && <AdminProfile />}
      {isMember && <MemberProfile />}
      {!isAdmin && !isMember && <UserProfile />}
    </div>
  )
}

export default Profile;
