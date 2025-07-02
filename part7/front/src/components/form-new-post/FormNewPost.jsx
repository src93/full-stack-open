import { useState } from 'react'
import {
  FormNewPostCustom,
  InputCustom,
  ButtonCreate,
  ContentForm
} from './FormNewPost.js'

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
    <ContentForm data-testid="formNewPost">
      <h3>Create a new post</h3>
      <FormNewPostCustom onSubmit={handleCreatePost}>
        <InputCustom
          type="text"
          value={title}
          name="Title"
          placeholder="Título"
          data-testid="inputTitle"
          onChange={({ target }) => setTitle(target.value)} />
        <InputCustom
          type="text"
          value={author}
          name="Author"
          placeholder="Autor"
          data-testid="inputAuthor"
          onChange={({ target }) => setAuthor(target.value)} />
        <InputCustom
          type="text"
          value={url}
          name="Url"
          placeholder="Url"
          data-testid="inputUrl"
          onChange={({ target }) => setUrl(target.value)} />
        <ButtonCreate data-testid="btnCreate">Create</ButtonCreate>
      </FormNewPostCustom>
    </ContentForm>
  )
}

export default FormNewPost