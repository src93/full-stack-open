import { logout } from '../../reducers/userLoggedReducer'
import { useSelector, useDispatch } from 'react-redux'
import Notification from '../Notification/Notification.jsx'
import { Link } from 'react-router-dom'
import {
  LogoutButton,
  MenuNav,
  MenuItem,
  Nav
} from './UserLogged.js'

const UserLogged = () => {
  const dispatch = useDispatch()
  const userLogged = useSelector(state => state.userLogged.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <h2>Blogs</h2>
      <Nav>
        <MenuNav>
          <Link to="/">
            <MenuItem>Blog</MenuItem>
          </Link>
          <Link to="/users">
            <MenuItem>Users</MenuItem>
          </Link>
        </MenuNav>
      </Nav>
      <Notification />
      <p>{userLogged.username} logged in</p>
      <LogoutButton
        data-testid="btnLogout"
        onClick={handleLogout}>
        Logout
      </LogoutButton>
    </>
  )
}

export default UserLogged