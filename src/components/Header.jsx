import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../features/auth/authSlice.js'

function Header() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch()

  function handleLogout() {
    dispatch(logout())
    localStorage.removeItem('currentUser')
  }

  return (
    <header>
      <h2><Link to="/">Evently</Link></h2>

      <nav>
        <Link to="/">Events</Link>
        <Link to="/my-events">My Events</Link>
        {currentUser ? (
          <>
            <span>Hello, {currentUser.name}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
