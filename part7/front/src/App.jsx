import { useEffect } from 'react'
import Blog from './components/Blog/Blog.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userLoggedReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ListUsers from './components/ListUsers/ListUsers.jsx'
import ListPostsByUser from './components/ListPostByUser/ListPostByUser.jsx'
import LoginForm from './components/LoginForm/LoginForm.jsx'
import Post from './components/Post/Post.jsx'

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
        <Route path='/users/:id' element={ <ListPostsByUser /> } />
        <Route path='/blogs/:id' element={ <Post /> } />
      </Routes>
    </Router>
  )
}

export default App