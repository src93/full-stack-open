import { useState } from 'react'
import { login } from '../services/login'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const credentials = {
      username,
      password
    }
    try {
      const user = await login(credentials)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('wrong credentials')
    }
  }

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <span>username</span>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <span>Password</span>
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm