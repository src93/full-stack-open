import { useState, useEffect, useRef } from 'react'
import Post from './Post/Post'
import Togglable from './Togglable'
import FormNewPost from './FormNewPost'
import blogService from '../services/blogs'
import Notification from './Notification/Notification'

const Blog = ({ user, handleLogout }) => {
  const [blog, setBlog] = useState([])
  const [message, setMessage] = useState('')
  const [typeMessage, setTypeMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlog(blogs)
    )
  }, [])

  const handleCreatePost = async (newPost) => {
    blogFormRef.current.toggleVisibility()
    try {
      blogService.setToken(user.token)
      const response = await blogService.create(newPost)
      setBlog(blog.concat(response))
      showSuccessMessage(response)
    } catch (error) {
      showErrorMessage()
    }
  }

  const showSuccessMessage = ({title, author}) => {
    setTypeMessage('success')
    setMessage(`A new blog ${title} by ${author} added`)
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
    }, 5000)
  }

  const showErrorMessage = () => {
    setTypeMessage('error')
    setMessage('Error creating post')
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
    }, 5000)
  }

  return (
    <>
      <h2>Blogs</h2>
      {showMessage && <Notification message={message} type={typeMessage} />}
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <Togglable buttonLabel="Create new post" ref={blogFormRef}>
        <FormNewPost createNewPost={handleCreatePost} />
      </Togglable>
      {blog.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </>
  )
}

export default Blog