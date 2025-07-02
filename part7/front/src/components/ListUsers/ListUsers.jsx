import { useEffect } from 'react'
import { initializeUsers } from '../../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import UserLogged from '../UserLogged/UserLogged.jsx'
import { Link } from 'react-router-dom'
import {
  TableListUsers,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow
} from './ListUsers.js'

const ListUsers = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <>
      <UserLogged />
      <h2>Users</h2>
      <TableListUsers>
        <TableHeader>
          <TableRow>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell>Blogs created</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>
                  {user.username}
                </Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </TableListUsers>
    </>
  )
}

export default ListUsers