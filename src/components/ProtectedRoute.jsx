import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const loggedInUser = useSelector((state) => state.auth.currentUser)

  if (!loggedInUser) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
