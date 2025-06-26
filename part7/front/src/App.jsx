import { useEffect } from 'react'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userLoggedReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ListUsers from './components/ListUsers/ListUsers'

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

  return (
    <Router>
      <Routes>
        <Route path='/' element={ !userLogged ? <LoginForm /> : <Blog /> } />
        <Route path='/users' element={ !userLogged ? <LoginForm /> : <ListUsers /> } />
      </Routes>
    </Router>
  )
}

export default App