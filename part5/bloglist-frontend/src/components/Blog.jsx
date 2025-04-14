import { useState, useEffect } from 'react'
import Post from './Post'
import blogService from '../services/blogs'
import Notification from './Notification/Notification'

const Blog = ({ user, handleLogout }) => {
  const [blog, setBlog] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [typeMessage, setTypeMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlog(blogs)
    )
  }, [])

  const handleCreatePost = async (e) => {
    e.preventDefault()
    const newPost = {
      title,
      author,
      url
    }
    try {
      blogService.setToken(user.token)
      const response = await blogService.create(newPost)
      setBlog(blog.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
      setTypeMessage('success')
      setMessage(`A new blog ${response.title} by ${response.author} added`)
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 5000)
    } catch (error) {
      console.log('error creating post', error)
      setTypeMessage('error')
      setMessage('Error creating post')
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 5000)
    }
  }

  return (
    <>
      <h2>Blogs</h2>
      {showMessage && <Notification message={message} type={typeMessage} />}
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <h3>Create a new post</h3>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          value={title}
          name="Title"
          placeholder="Título"
          onChange={({ target }) => setTitle(target.value)} />
        <br />
        <input
          type="text"
          value={author}
          name="Author"
          placeholder="Autor"
          onChange={({ target }) => setAuthor(target.value)} />
        <br />
        <input
          type="text"
          value={url}
          name="Url"
          placeholder="Url"
          onChange={({ target }) => setUrl(target.value)} />
        <br />
        <button>Create</button>
      </form>
      {blog.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </>
  )
}

export default Blog