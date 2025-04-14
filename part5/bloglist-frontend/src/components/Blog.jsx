import { useState, useEffect } from 'react'
import Post from './Post'
import blogService from '../services/blogs'

const Blog = ({ user, handleLogout }) => {
  const [blog, setBlog] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlog(blogs)
    )
  }, [])

  return (
    <>
      <h2>Blogs</h2>
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      {blog.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </>
  )
}

export default Blog