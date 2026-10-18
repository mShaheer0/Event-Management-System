import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCurrentUser } from '../features/auth/authSlice.js'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const users = useSelector((state) => state.auth.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(formEvent) {
    formEvent.preventDefault()

    const matchingUser = users.find(
      (user) =>
        user.email === email.trim().toLowerCase() && user.password === password,
    )

    if (!matchingUser) {
      setError('Invalid email or password.')
      return
    }

    dispatch(setCurrentUser(matchingUser))
    localStorage.setItem('currentUser', JSON.stringify(matchingUser))
    navigate('/')
  }

  return (
    <section>
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p>
        New user? <Link to="/register">Register here</Link>
      </p>
    </section>
  )
}

export default LoginPage
