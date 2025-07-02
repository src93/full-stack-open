import PropTypes from 'prop-types'
import { setMessage, clearMessage } from '../../reducers/notificationReducer'
import { updatePost, removePost } from '../../reducers/blogReducer'
import blogService from '../../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import UserLogged from '../UserLogged/UserLogged.jsx'
import { useState } from 'react'
import { ButtonRemove } from './Post'

const Post = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
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
      } finally {
        navigate('/')
      }
    }
  }

  const handleAddComment = async () => {
    if (comment.trim() === '') {
      dispatch(setMessage({
        message: 'Comment cannot be empty',
        typeMessage: 'error',
        timeoutId: setTimeout(() => dispatch(clearMessage()), 5000)
      }))
      return
    }

    const newPost = {
      ...post,
      user: post.user.id,
      comments: [...post.comments, comment]
    }
    try {
      blogService.setToken(userLogged.token)
      dispatch(updatePost(newPost))
      setComment('')
      dispatch(setMessage({
        message: 'Comment added successfully',
        typeMessage: 'success',
        timeoutId: setTimeout(() => dispatch(clearMessage()), 5000)
      }))
    } catch (error) {
      dispatch(setMessage({
        message: 'Error adding comment',
        typeMessage: 'error',
        timeoutId: setTimeout(() => dispatch(clearMessage()), 5000)
      }))
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
            <ButtonRemove
              data-testid="btnRemove"
              onClick={handleRemove}>
              remove
            </ButtonRemove>
            : ''
        }
        <h2>Comments</h2>
        <input
          type="text"
          placeholder="Add a comment"
          data-testid="inputComment"
          value={comment}
          onChange={({ target }) => setComment(target.value)} />
        <button
          onClick={handleAddComment}>
          Add Comment
        </button>
        <ul>
          {post.comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            post.comments.map((comment, index) => (
              <li key={index} data-testid="commentItem">
                {comment}
              </li>
            ))
          )}
        </ul>
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