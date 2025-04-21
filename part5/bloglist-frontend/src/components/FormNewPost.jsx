import { useState, useEffect } from 'react'

const FormNewPost = ({ createNewPost }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreatePost = async (e) => {
    e.preventDefault()
    const newPost = {
      title,
      author,
      url
    }
    await createNewPost(newPost)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
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
    </>
  )
}

export default FormNewPost