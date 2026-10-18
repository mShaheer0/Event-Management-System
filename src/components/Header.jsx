import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <h2><Link to="/">Evently</Link></h2>

      <nav>
        <Link to="/">Events</Link>
        <Link to="/my-events">My Events</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  )
}

export default Header
