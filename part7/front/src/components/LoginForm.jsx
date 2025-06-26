import { login } from '../services/login'
import Notification from './Notification/Notification'
import { useNotification, useUser } from '../hooks'

const LoginForm = () => {
  const { setNotification } = useNotification()
  const { userContext, setUser } = useUser()

  const handleLogin = async (e) => {
    e.preventDefault()
    const credentials = {
      username: userContext.username,
      password: userContext.password
    }
    try {
      const user = await login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser({ user, username: '', password: '' })
    } catch (error) {
      setNotification({
        message: `Wrong credentials, ${error.response.data.error}`,
        typeMessage: 'error',
      })
    }
  }

  return (
    <>
      <h2>log in to application</h2>
      <Notification />
      <form
        data-testid="login-form"
        onSubmit={handleLogin}>
        <div>
          <span>username</span>
          <input
            type="text"
            value={userContext.username}
            name="Username"
            data-testid="loginUsername"
            onChange={({ target }) => setUser({ username: target.value})} />
        </div>
        <div>
          <span>Password</span>
          <input
            type="text"
            value={userContext.password}
            name="Password"
            data-testid="loginPassword"
            onChange={({ target }) => setUser({ password: target.value})} />
        </div>
        <button
          data-testid="loginButton"
          type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm