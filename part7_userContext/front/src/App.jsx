import { useEffect } from 'react'
import Blog from './components/Blog'
import { useUser } from './hooks'

import LoginForm from './components/LoginForm'

const App = () => {
  const { setUser, userLogged } = useUser()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userInSession = JSON.parse(loggedUserJSON)
      console.log('user', userInSession.username);
      setUser({
        user: userInSession
      })
    }
  }, [setUser])

  return (
    <div>
      {
        !userLogged.user ?
        <LoginForm /> :
        <Blog />
      }
    </div>
  )
}

export default App