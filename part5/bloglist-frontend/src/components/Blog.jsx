import { useState, useEffect } from 'react'
import Post from './Post'
import blogService from '../services/blogs'

const Blog = () => {
  const [blog, setBlog] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlog(blogs)
    )
  }, [])
  return (
    <>
      <h2>blogs</h2>
      {blog.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </>
  )
}

export default Blog