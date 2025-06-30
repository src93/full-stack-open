import { logout } from '../../reducers/userLoggedReducer'
import { useSelector, useDispatch } from 'react-redux'
import Notification from '../Notification/Notification'
import { Link } from 'react-router-dom'
import './UserLogged.css'

const UserLogged = () => {
  const dispatch = useDispatch()
  const userLogged = useSelector(state => state.userLogged.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <h2>Blogs</h2>
      <nav>
        <ul className="menu-nav">
          <Link to="/">
            <li>Blog</li>
          </Link>
          <Link to="/users">
            <li>Users</li>
          </Link>
        </ul>
      </nav>
      <Notification />
      <p>{userLogged.username} logged in</p>
      <button
        data-testid="btnLogout"
        onClick={handleLogout}>
        Logout
      </button>
    </>
  )
}

export default UserLogged