import { logout } from '../../reducers/userLoggedReducer'
import { useSelector, useDispatch } from 'react-redux'
import Notification from '../Notification/Notification'

const UserLogged = () => {
  const dispatch = useDispatch()
  const userLogged = useSelector(state => state.userLogged.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <h2>Blogs</h2>
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