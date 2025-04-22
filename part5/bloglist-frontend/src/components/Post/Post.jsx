import { useState, useEffect } from 'react'
import './Post.css'
import PropTypes from 'prop-types'

const Post = ({ post, updatePost, removePost }) => {
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

  const details = () => {
    return (
      <>
        <p>{post.url}</p>
        {post.likes} likes
        <button onClick={handleLike}>like</button>
        <br />
        <p>{post.user.name}</p>
        <button className='btn-remove' onClick={handleRemove}>remove</button>
      </>
    )
  }

  return (
    <div className="post" data-testid="content-post">
      <span data-testid="postTitle">{post.title}</span> by <span data-testid="postAuthor">{post.author}</span>
      <button onClick={() => setShowDetails(!showDetails)}>{textButtonView}</button>
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