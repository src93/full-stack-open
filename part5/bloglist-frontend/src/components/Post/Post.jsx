import { useState, useEffect } from 'react'
import './Post.css'

const Post = ({ post }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [textButtonView, setTextButtonView] = useState('view')

  useEffect(() => {
    showDetails ? setTextButtonView('hide') : setTextButtonView('view')
  }, [showDetails])

  const details = () => {
    return (
      <>
        <p>{post.url}</p>
        {post.likes} likes
        <button>like</button>
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