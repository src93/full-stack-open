import { useState, useEffect } from 'react'
import './Post.css'
import PropTypes from 'prop-types'

const Post = ({ post, updatePost, removePost, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [textButtonView, setTextButtonView] = useState('view')

  useEffect(() => {
    showDetails ? setTextButtonView('hide') : setTextButtonView('view')
  }, [showDetails])

  const handleLike = async () => {
    const newPost = {
      ...post,
      user: post.user.id,
      likes: post.likes + 1
    }
    updatePost(newPost)
  }

  const handleRemove = async () => {
    const userWantsRemove = window.confirm(`Are you sure you want to delete ${post.title} blog?`)
    if (userWantsRemove) {
      removePost(post.id)
    }
  }

  const canSeeDetails = () => {
    return user.username === post?.user?.username
  }

  const details = () => {
    return (
      <>
        <p data-testid="postUrl">{post.url}</p>
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
      </>
    )
  }

  return (
    <div className="post" data-testid="contentPost">
      <span data-testid="postTitle">{post.title}</span> by <span data-testid="postAuthor">{post.author}</span>
      <button
        data-testid="btnView"
        onClick={() => setShowDetails(!showDetails)}>
        {textButtonView}
      </button>
      {showDetails ? details() : ''}
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  updatePost: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired
}

export default Post