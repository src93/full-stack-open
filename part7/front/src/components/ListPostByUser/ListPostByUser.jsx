import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserLogged from '../UserLogged/UserLogged'

const ListPostsByUser = () => {
  const match = useMatch('/users/:id')
  const users = useSelector(state => state.users)
  const user = users.find(user => user.id === match.params.id)

  if (!user) {
    return null
  }

  return (
    <>
      <UserLogged />
      <h2>{user.username}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            <p>{blog.title}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListPostsByUser