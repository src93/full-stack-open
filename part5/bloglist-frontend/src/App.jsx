import { useState, useEffect } from 'react'
import Blog from './components/Blog'

import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  return (
    <div>
      {
        !user ?
        <LoginForm setUser={setUser} /> :
        <Blog blog={blogs} />
      }
    </div>
  )
}

export default App