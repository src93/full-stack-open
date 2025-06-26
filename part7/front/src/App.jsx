import { useEffect } from 'react'
import Blog from './components/Blog'
import { useUser } from './hooks'

import LoginForm from './components/LoginForm'

const App = () => {
  const { setUser, userContext } = useUser()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('user', user.username);
      setUser(user)
    }
  }, [setUser])

  return (
    <div>
      {
        !userContext.user ?
        <LoginForm /> :
        <Blog />
      }
    </div>
  )
}

export default App