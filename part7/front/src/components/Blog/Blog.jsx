import { useEffect, useRef } from 'react'
import Togglable from '../Togglable'
import FormNewPost from '../form-new-post/FormNewPost'
import blogService from '../../services/blogs'
import { setMessage, clearMessage } from '../../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createPost } from '../../reducers/blogReducer'
import UserLogged from '../UserLogged/UserLogged'
import { Link } from 'react-router-dom'
import './Blog.css'

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

  return (
    <div data-testid="blog">
      <UserLogged />
      <br />
      <Togglable buttonLabel="Create new post" ref={blogFormRef}>
        <FormNewPost createNewPost={handleCreatePost} />
      </Togglable>
      {[...blog].sort((a, b) => b.likes - a.likes).map(post => (
        <Link key={post.id} to={`/blogs/${post.id}`}>
          <div className="post">
            {post.title}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Blog