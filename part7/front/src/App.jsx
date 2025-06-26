import { useEffect } from 'react'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearInputFormLogin } from './reducers/userLoggedReducer'

import LoginForm from './components/LoginForm'

const App = () => {
  const dispatch = useDispatch()
  const userLogged = useSelector(state => state.userLogged.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('user', user.username);
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(clearInputFormLogin())
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      {
        !userLogged ?
        <LoginForm /> :
        <Blog handleLogout={handleLogout} user={userLogged} />
      }
    </div>
  )
}

export default App