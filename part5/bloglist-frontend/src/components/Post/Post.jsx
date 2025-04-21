import { useState, useEffect } from 'react'
import './Post.css'

const Post = ({ post, updatePost }) => {
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

  const details = () => {
    return (
      <>
        <p>{post.url}</p>
        {post.likes} likes
        <button onClick={handleLike}>like</button>
        <br />
        <p>{post.user.name}</p>
      </>
    )
  }

  return (
    <div className="post">
      {post.title}
      <button onClick={() => setShowDetails(!showDetails)}>{textButtonView}</button>
      {showDetails ? details() : ''}
    </div>
  )
}

export default Post