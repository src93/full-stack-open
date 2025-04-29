import { useState } from 'react'

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
    <div data-testid="formNewPost">
      <h3>Create a new post</h3>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          value={title}
          name="Title"
          placeholder="Título"
          data-testid="inputTitle"
          onChange={({ target }) => setTitle(target.value)} />
        <br />
        <input
          type="text"
          value={author}
          name="Author"
          placeholder="Autor"
          data-testid="inputAuthor"
          onChange={({ target }) => setAuthor(target.value)} />
        <br />
        <input
          type="text"
          value={url}
          name="Url"
          placeholder="Url"
          data-testid="inputUrl"
          onChange={({ target }) => setUrl(target.value)} />
        <br />
        <button data-testid="btnCreate">Create</button>
      </form>
    </div>
  )
}

export default FormNewPost