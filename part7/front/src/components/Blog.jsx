import { useState, useEffect, useRef } from 'react'
import Post from './Post/Post'
import Togglable from './Togglable'
import FormNewPost from './form-new-post/FormNewPost'
import blogService from '../services/blogs'
import Notification from './Notification/Notification'
import { setMessage, clearMessage } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ user, handleLogout }) => {
  const dispatch = useDispatch()
  const [blog, setBlog] = useState([])
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
      dispatch(setMessage({
        message: `A new blog ${response.title} by ${response.author} added`,
        typeMessage: 'success',
        timeoutId: setTimeout(() => dispatch(clearMessage()), 5000)
      }))
    } catch (error) {
      dispatch(setMessage({
        message: 'Error creating post',
        typeMessage: 'error',
        timeoutId: setTimeout(() => dispatch(clearMessage()), 5000)
      }))
    }
  }

  const handleUpdatePost = async (newPost) => {
    try {
      blogService.setToken(user.token)
      const response = await blogService.update(newPost)
      setBlog(blog.map(post => post.id !== newPost.id ? post : response))
      dispatch(setMessage({
        message: `title: ${response.title} by ${response.author} updated`,
        typeMessage: 'success',
        timeoutId: setTimeout(() => dispatch(clearMessage()), 5000)
      }))
    } catch (error) {
      dispatch(setMessage({
        message: 'Error updating post',
        typeMessage: 'error',
        timeoutId: setTimeout(() => dispatch(clearMessage()), 5000)
      }))
    }
  }

  const handleRemovePost = async (id) => {
    try {
      blogService.setToken(user.token)
      await blogService.remove(id)
      setBlog(blog.filter(post => post.id !== id))
      dispatch(setMessage({
        message: 'Post deleted',
        typeMessage: 'success',
        timeoutId: setTimeout(() => dispatch(clearMessage()), 5000)
      }))
    } catch (error) {
      dispatch(setMessage({
        message: 'Error deleting post',
        typeMessage: 'error',
        timeoutId: setTimeout(() => dispatch(clearMessage()), 5000)
      }))
    }
  }

  return (
    <div data-testid="blog">
      <h2>Blogs</h2>
      <Notification />
      <p>{user.username} logged in</p>
      <button
        data-testid="btnLogout"
        onClick={handleLogout}>
        Logout
      </button>
      <br />
      <Togglable buttonLabel="Create new post" ref={blogFormRef}>
        <FormNewPost createNewPost={handleCreatePost} />
      </Togglable>
      {blog.sort((a, b) => b.likes - a.likes).map(post => (
        <Post
          key={post.id}
          post={post}
          user={user}
          updatePost={handleUpdatePost}
          removePost={handleRemovePost} />
      ))}
    </div>
  )
}

export default Blog