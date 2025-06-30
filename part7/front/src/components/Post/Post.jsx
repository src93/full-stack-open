import './Post.css'
import PropTypes from 'prop-types'
import { setMessage, clearMessage } from '../../reducers/notificationReducer'
import { updatePost, removePost } from '../../reducers/blogReducer'
import blogService from '../../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import UserLogged from '../UserLogged/UserLogged'

const Post = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const userLogged = useSelector(state => state.userLogged.user)
  const blog = useSelector(state => state.blog)
  const post = blog.find(post => post.id === id)

  const handleLike = async () => {
    const newPost = {
      ...post,
      user: post.user.id,
      likes: post.likes + 1
    }
    try {
      blogService.setToken(userLogged.token)
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

  const handleRemove = async () => {
    const userWantsRemove = window.confirm(`Are you sure you want to delete ${post.title} blog?`)
    if (userWantsRemove) {
      const { id } = post
      try {
        blogService.setToken(userLogged.token)
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
  }

  const canSeeDetails = () => {
    return userLogged.username === post?.user?.username
  }

  return (
    <>
      <UserLogged />
      <div data-testid="contentPost">
        <h2 data-testid="postTitle">{post.title} by {post.author}</h2>
        <a href={post.url} target="_blank" rel="noopener noreferrer">
          <p>{post.url}</p>
        </a>
        <span data-testid="postLikes">{post.likes} likes</span>
        <button
          data-testid="btnLikes"
          onClick={handleLike}>
          like
        </button>
        <br />
        <p>{post.user.name}</p>
        {
          canSeeDetails() ?
            <button
              className="btn-remove"
              data-testid="btnRemove"
              onClick={handleRemove}>
              remove
            </button>
            : ''
        }
      </div>
    </>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  updatePost: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired
}

export default Post