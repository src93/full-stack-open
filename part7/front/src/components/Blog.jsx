import { useEffect, useRef } from 'react'
import Post from './Post/Post'
import Togglable from './Togglable'
import FormNewPost from './form-new-post/FormNewPost'
import blogService from '../services/blogs'
import { setMessage, clearMessage } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createPost, updatePost, removePost } from '../reducers/blogReducer'
import UserLogged from './UserLogged/UserLogged'

const Blog = () => {
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blog)
  const user = useSelector(state => state.userLogged.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleCreatePost = async (newPost) => {
    blogFormRef.current.toggleVisibility()
    try {
      blogService.setToken(user.token)
      dispatch(createPost(newPost))
      dispatch(setMessage({
        message: `A new blog ${newPost.title} by ${newPost.author} added`,
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
      dispatch(updatePost(newPost))
      dispatch(setMessage({
        message: `title: ${newPost.title} by ${newPost.author} updated`,
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
      dispatch(removePost(id))
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
      <UserLogged />
      <br />
      <Togglable buttonLabel="Create new post" ref={blogFormRef}>
        <FormNewPost createNewPost={handleCreatePost} />
      </Togglable>
      {[...blog].sort((a, b) => b.likes - a.likes).map(post => (
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