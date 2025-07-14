import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner"
import useUserRole from "../../../hooks/useUserRole"


const Dashboard = () => {
  const { isAdmin, isMember, isLoading } = useUserRole()

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      {isAdmin && <p>Welcome Admin</p>}
      {isMember && <p>Welcome Member</p>}
      {!isAdmin && !isMember && <p>Welcome User Interface</p>}
    </div>
  )
}

export default Dashboard;
