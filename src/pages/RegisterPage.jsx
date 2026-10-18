import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <section>
      <h1>Register</h1>
      <form>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" />

        <label htmlFor="register-email">Email</label>
        <input id="register-email" type="email" />

        <label htmlFor="register-password">Password</label>
        <input id="register-password" type="password" />

        <button type="submit">Register</button>
      </form>
      <p>Already registered? <Link to="/login">Login here</Link></p>
    </section>
  )
}

export default RegisterPage
