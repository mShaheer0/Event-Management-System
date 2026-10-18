import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <section>
      <h1>Login</h1>
      <form>
        <label htmlFor="login-email">Email</label>
        <input id="login-email" type="email" />

        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="password" />

        <button type="submit">Login</button>
      </form>
      <p>New user? <Link to="/register">Register here</Link></p>
    </section>
  )
}

export default LoginPage
