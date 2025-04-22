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
      showSuccessMessage(`A new blog ${response.title} by ${response.author} added`)
    } catch (error) {
      showErrorMessage('Error creating post')
    }
  }

  const handleUpdatePost = async (newPost) => {
    try {
      blogService.setToken(user.token)
      const response = await blogService.update(newPost)
      setBlog(blog.map(post => post.id !== newPost.id ? post : response))
      showSuccessMessage(`title: ${response.title} by ${response.author} updated`)
    } catch (error) {
      showErrorMessage('Error updating post')
    }
  }

  const handleRemovePost = async (id) => {
    try {
      blogService.setToken(user.token)
      await blogService.remove(id)
      setBlog(blog.filter(post => post.id !== id))
      showSuccessMessage('Post deleted')
    } catch (error) {
      showErrorMessage('Error deleting post')
    }
  }

  const showSuccessMessage = (message) => {
    setTypeMessage('success')
    setMessage(message)
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
    }, 5000)
  }

  const showErrorMessage = (message) => {
    setTypeMessage('error')
    setMessage(message)
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
      {blog.sort((a, b) => b.likes - a.likes).map(post => (
        <Post key={post.id} post={post} updatePost={handleUpdatePost} removePost={handleRemovePost} />
      ))}
    </>
  )
}

export default Blog