import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../features/auth/authSlice.js'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const users = useSelector((state) => state.auth.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(formEvent) {
    formEvent.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()
    const emailExists = users.some((user) => user.email === normalizedEmail)

    if (emailExists) {
      setError('An account with this email already exists.')
      return
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password,
    }

    dispatch(registerUser(newUser))
    localStorage.setItem('users', JSON.stringify([...users, newUser]))
    navigate('/login')
  }

  return (
    <section>
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
      <p>
        Already registered? <Link to="/login">Login here</Link>
      </p>
    </section>
  )
}

export default RegisterPage
