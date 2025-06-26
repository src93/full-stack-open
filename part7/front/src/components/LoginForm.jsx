import Notification from './Notification/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage, clearMessage } from '../reducers/notificationReducer'
import { loginUser, setPassword, setUsername } from '../reducers/userLoggedReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { username, password } = useSelector(state => state.userLogged)

  const handleLogin = async (e) => {
    e.preventDefault()
    const credentials = {
      username,
      password
    }
    try {
      // const user = await login(credentials)
      await dispatch(loginUser(credentials)).unwrap()
    } catch (error) {
      dispatch(setMessage({
        message: `Wrong credentials, ${error}`,
        typeMessage: 'error',
        timeoutId: setTimeout(() => dispatch(clearMessage()), 5000)
      }))
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
            value={username}
            name="Username"
            data-testid="loginUsername"
            onChange={({ target }) => dispatch(setUsername(target.value))} />
        </div>
        <div>
          <span>Password</span>
          <input
            type="text"
            value={password}
            name="Password"
            data-testid="loginPassword"
            onChange={({ target }) => dispatch(setPassword(target.value))} />
        </div>
        <button
          data-testid="loginButton"
          type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm