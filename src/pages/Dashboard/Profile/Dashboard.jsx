import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner"
import useUserRole from "../../../hooks/useUserRole"
import AdminDashboard from "./components/AdminDashboard"
import MemberDashboard from "./components/MemberDashboard"
import UserDashboard from "./components/UserDashboard"

const Profile = () => {
  const { isAdmin, isMember, isLoading } = useUserRole()

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      {isAdmin && <AdminDashboard />}
      {isMember && <MemberDashboard />}
      {!isAdmin && !isMember && <UserDashboard />}
    </div>
  )
}

export default Profile;
