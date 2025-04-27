import { useState } from 'react'
import { login } from '../services/login'
import Notification from './Notification/Notification'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [typeMessage, setTypeMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    const credentials = {
      username,
      password
    }
    try {
      const user = await login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setTypeMessage('error')
      setMessage('Wrong credentials', error)
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 5000)
    }
  }

  return (
    <>
      <h2>log in to application</h2>
      {showMessage && <Notification message={message} type={typeMessage} />}
      <form
        data-testid="login-form"
        onSubmit={handleLogin}>
        <div>
          <span>username</span>
          <input
            type="text"
            value={username}
            name="Username"
            data-testid="loginUsername"
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <span>Password</span>
          <input
            type="text"
            value={password}
            name="Password"
            data-testid="loginPassword"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button
          data-testid="loginButton"
          type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm