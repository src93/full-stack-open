import { useState, useEffect } from 'react'
import Blog from './components/Blog'

import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('user', user.username);
      setUser(user)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      {
        !user ?
        <LoginForm setUser={setUser} /> :
        <Blog handleLogout={handleLogout} user={user} />
      }
    </div>
  )
}

export default App